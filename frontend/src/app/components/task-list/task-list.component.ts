import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { Task} from '../../model/task.model';
import { Label } from '../../model/label.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  labels: Label[] = [];
  newTask: Partial<Task> = { title: '', completed: false, labelId: 1 };
  editingTaskId: number | null = null;
  editTask: Partial<Task> = {};

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchTasks();
    this.fetchLabels();
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
        this.newTask = { title: '', completed: false, labelId: 1 };
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
  console.log('Toggle completed, wysyłane do backendu:', updatedTask); // DEBUG

  this.taskService.updateTask(updatedTask).subscribe(
    (responseTask) => {
      // Aktualizujemy taska z odpowiedzi backendu!
      Object.assign(task, responseTask);
      this.snackBar.open('Task updated!', 'Close', { duration: 1000 });
    },
    (error) => {
      this.snackBar.open('Update failed!', 'Close', { duration: 2000 });
      console.error('Update failed!', error);
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
