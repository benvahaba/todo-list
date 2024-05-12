import { Injectable } from '@angular/core';
import { TodosRequestsService } from '../../../apis/todos-requests.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../../../types/todo/todo';
import { ToastTheme } from '../../../types/toast/toast-theme';
import { ToastsService } from '../../../shared/services/toasts.service';
import { Toast } from '../../../types/toast/toast';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private _todosListSub: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>(
    []
  );
  public readonly todosListSub!: Observable<Todo[]>;

  constructor(
    private todosRequestsService: TodosRequestsService,
    private toastsService: ToastsService
  ) {
    this.todosListSub = this._todosListSub.asObservable();
  }

  public getAllPosts(userId: number): Observable<Todo[]> {
    this.todosRequestsService.getAllTodos(userId).subscribe({
      next: (todosList: Todo[]) => {
        this._todosListSub.next(todosList);
      },
      error: (error) => {
        const toast: Toast = {
          header: `Oops`,
          body: ['You have successfully registered'],
          theme: ToastTheme.DANGER,
        };

        this.toastsService.addToast(toast);
      },
    });

    return this.todosListSub;
  }

  public updateTodo(todo: Todo) {
    const toast: Toast = {};

    todo.completed
      ? (todo.completionTime = new Date())
      : delete todo.completionTime;

    todo.wasCompleted = true;
    this.todosRequestsService.updateTodo(todo).subscribe({
      next: (updatedTodo: Todo) => {
        const todosList: Todo[] = this._todosListSub.getValue();
        const index = todosList.findIndex((todo: Todo) => {
          return todo.id === updatedTodo.id;
        });
        if (index != -1) {
          todosList[index] = updatedTodo;
          toast.body = ['Todo updated succesfully'];
          toast.theme = ToastTheme.SUCCESS;
        } else {
          toast.body = ["couldn't update todo"];
          toast.theme = ToastTheme.DANGER;
        }

        this.toastsService.addToast(toast);
        this._todosListSub.next(todosList);
      },
      error: (error: Error) => {
        toast.body = [error.message];
        toast.theme = ToastTheme.DANGER;
        this.toastsService.addToast(toast);
      },
    });

    return this.todosListSub;
  }

  public createTodo(todo: Todo) {
    const toast: Toast = {};

    this.todosRequestsService.createTodo(todo).subscribe({
      next: (createdTodo: Todo) => {
        const todosList: Todo[] = this._todosListSub.getValue();

        todosList.unshift(createdTodo);

        toast.body = ['Todo created succesfully'];
        toast.theme = ToastTheme.SUCCESS;

        this.toastsService.addToast(toast);
        this._todosListSub.next(todosList);
      },
      error: (error: Error) => {
        toast.body = [error.message];
        toast.theme = ToastTheme.DANGER;
        this.toastsService.addToast(toast);
      },
    });

    return this.todosListSub;
  }
}
