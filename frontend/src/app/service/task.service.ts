import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task.model';
import { Label } from '../model/label.model';
import { retryWhen, delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks';
  private labelUrl = 'http://localhost:8080/api/labels';
  private notifUrl = 'http://localhost:8080/api/notifications/stream';

  constructor(private http: HttpClient, private ngZone: NgZone) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getLabels(): Observable<Label[]> {
    return this.http.get<Label[]>(this.labelUrl);
  }

  addTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

 getNotifications(): Observable<string> {
  return new Observable<string>(observer => {
    const es = new EventSource(this.notifUrl);

    es.onmessage = event => this.ngZone.run(() => observer.next(event.data));
    es.onerror   = () => {
      // Nie zamykajmy w error, tylko pozwólmy na retry linii poniżej
      es.close();
      observer.complete();
    };

    return () => es.close();
  }).pipe(
    retryWhen(errors => errors.pipe(delay(5000)))
  );
}



}
