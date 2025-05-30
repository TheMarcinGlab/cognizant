import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { TaskService } from '../../service/task.service';
import { Task } from '../../model/task.model';
import { Label } from '../../model/label.model';
import { MatSnackBar } from '@angular/material/snack-bar';


type FilterOption = 
  'ALL' | 'COMPLETED' | 'INCOMPLETE' | 'HOME' | 'WORK';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
 tasks: Task[] = [];
  labels: Label[] = [];
  newTask: Partial<Task> = { title: '', completed: false, labelId: undefined };
  editingTaskId: number | null = null;
  editTask: Partial<Task> = {};


  filterOption: FilterOption = 'ALL';

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
   this.loadData();
    this.listenNotifications();

  }

   // Pobranie i połączenie strumieni RxJS + filtr
 private loadData() {
    combineLatest([
      this.taskService.getTasks(),
      this.taskService.getLabels()
    ]).subscribe(([tasks, labels]) => {
      this.labels = labels;
      // Wzbogacamy zadania o labelName
      let withLabels = tasks.map(t => ({
        ...t,
        labelName: labels.find(l => l.id === t.labelId)?.name || ''
      }));
      // Aplikujemy filtr
      this.tasks = this.applyFilter(withLabels);
    });
  }

    private applyFilter(tasks: Array<Task & { labelName: string }>): Task[] {
    switch (this.filterOption) {
      case 'COMPLETED':
        return tasks.filter(t => t.completed);
      case 'INCOMPLETE':
        return tasks.filter(t => !t.completed);
      case 'HOME':
        return tasks.filter(t => t.labelName === 'Home');
      case 'WORK':
        return tasks.filter(t => t.labelName === 'Work');
      default: // 'ALL'
        return tasks;
    }
  }

    // Wywołanie przy zmianie opcji filtra
  onFilterChange(option: FilterOption) {
    this.filterOption = option;
    this.loadData();
  }

   private listenNotifications() {
    this.taskService.getNotifications().subscribe(
      message => this.snackBar.open(message, 'Zamknij', { duration: 2000 }),
      err => console.error('Błąd SSE:', err)
    );
  }

  fetchTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  fetchLabels() {
    this.taskService.getLabels().subscribe(labels => {
      this.labels = labels;
    });
  }

  addTask() {
    if (!this.newTask.title?.trim() || !this.newTask.labelId) {
      this.snackBar.open('Please fill all fields.', 'Close', { duration: 1200 });
      return;
    }
    this.taskService.addTask(this.newTask).subscribe({
      next: task => {
        this.tasks.push(task);
        this.newTask = { title: '', completed: false, labelId: undefined };
        this.snackBar.open('Task added!', 'Close', { duration: 1200 });
      },
      error: err => {
        this.snackBar.open('Error adding task!', 'Close', { duration: 1200 });
      }
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id!).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
      this.snackBar.open('Task deleted!', 'Close', { duration: 1200 });
    });
  }

  toggleCompleted(task: Task) {
    const updatedTask = { ...task, completed: !task.completed };
    this.taskService.updateTask(updatedTask).subscribe(
      (responseTask) => {
        Object.assign(task, responseTask);
        this.snackBar.open('Task updated!', 'Close', { duration: 1000 });
      },
      (error) => {
        this.snackBar.open('Update failed!', 'Close', { duration: 2000 });
      }
    );
  }

  // Najważniejsza nowa metoda!
  onLabelChange(task: Task, labelId: number) {
    if (task.labelId === labelId) return; // nic nie rób jeśli bez zmiany
    const updatedTask = { ...task, labelId };
    this.taskService.updateTask(updatedTask).subscribe(
      (updated) => {
        Object.assign(task, updated);
        this.snackBar.open('Label changed!', 'Close', { duration: 1000 });
      },
      (err) => {
        this.snackBar.open('Failed to change label!', 'Close', { duration: 2000 });
      }
    );
  }

  startEdit(task: Task) {
    this.editingTaskId = task.id!;
    this.editTask = { ...task };
  }

  saveEdit(task: Task) {
    const trimmed = this.editTask.title?.trim();
    if (!trimmed || !this.editTask.labelId) return;
    this.taskService.updateTask({ ...task, title: trimmed, labelId: this.editTask.labelId }).subscribe(updatedTask => {
      Object.assign(task, updatedTask);
      this.editingTaskId = null;
      this.snackBar.open('Task edited!', 'Close', { duration: 1000 });
    });
  }

  cancelEdit() {
    this.editingTaskId = null;
  }
  
}
