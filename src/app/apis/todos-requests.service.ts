import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettingsService } from '../core/services/app-settings.service';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Todo } from '../types/todo/todo';

@Injectable({
  providedIn: 'root',
})
export class TodosRequestsService {
  constructor(private http: HttpClient) {}

  public getAllTodos(userId: number): Observable<Todo[]> {
    const options = { params: new HttpParams().set('userId', userId) };

    return this.http.get<Todo[]>(
      `${AppSettingsService._API_ENDPOINT}/todos`,
      options
    );
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(
      `${AppSettingsService._API_ENDPOINT}/todos/${todo.id}`,
      todo
    );
  }

  public createTodo(todo: Todo): Observable<Todo> {
    debugger;
    return this.http.post<Todo>(
      `${AppSettingsService._API_ENDPOINT}/todos`,
      todo
    );
  }
}
