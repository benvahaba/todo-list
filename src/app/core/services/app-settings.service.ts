import { Injectable } from '@angular/core';
import { TodosConfig } from '../../types/todo/todos-config';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  public static readonly _API_ENDPOINT = 'https://jsonplaceholder.typicode.com';
  public static readonly toasts = {
    defaultTimeInMilli: 5000,
  };
  public static readonly todosConfig: TodosConfig = {
    showAllTodos: true,
    numOfTodosPerPage: 15,
  };
  constructor() {}
}
