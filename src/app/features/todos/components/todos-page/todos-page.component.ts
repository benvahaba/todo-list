import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Subscription } from 'rxjs';
import { Todo } from '../../../../types/todo/todo';
import { User } from '../../../../types/user/user';

import { TodosConfigService } from '../../services/todos-config.service';
import { TodosConfig } from '../../../../types/todo/todos-config';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrl: './todos-page.component.scss',
})
export class TodosPageComponent implements OnInit, OnDestroy {
  public user: User;
  private todosListSub!: Subscription;
  public todosList: Todo[];
  public filteredTodoList: Todo[];
  public filteredTodoPerPageList: Todo[];
  public todosConfig: TodosConfig;
  public currentPage: number = 1;

  public constructor(
    private authService: AuthService,
    private todosService: TodosService,
    private todosConfigService: TodosConfigService
  ) {}

  ngOnInit(): void {
    this.todosConfig = this.todosConfigService.todosConfig;
    this.user = this.authService.loggedUser;
    this.todosListSub = this.todosService.getAllPosts(this.user.id).subscribe({
      next: (todosList) => {
        this.todosList = todosList;
        this.filterTodosByConfig();
        this.setTodosPerPage();
        if (this.filteredTodoPerPageList.length === 0) {
          this.onPageChanged(1);
        }
      },
      error: (err) => {},
    });
  }

  public onCreateTodo(todo: Todo) {
    this.todosService.createTodo(todo);
  }

  public onTodoChanged(todo: Todo) {
    this.todosService.updateTodo(todo);
  }

  public onLogOutClicked() {
    this.authService.signOut();
  }

  public filterTodosByConfig() {
    this.filteredTodoList = this.todosList.filter((todo: Todo) => {
      //filter by showAllTodos
      return this.todosConfig.showAllTodos || !todo.completed;
    });
  }

  public onTodosConfigChange(todosConfig: TodosConfig) {
    this.todosConfigService.todosConfig = todosConfig;
    this.filterTodosByConfig();
    this.onPageChanged(1);
  }

  public onPageChanged(currentPage: number) {
    this.currentPage = currentPage;
    this.setTodosPerPage();
  }

  public setTodosPerPage() {
    debugger;
    const startIndex =
      (this.currentPage - 1) * this.todosConfig.numOfTodosPerPage;
    const endIndex =
      this.currentPage * this.todosConfig.numOfTodosPerPage <
      this.filteredTodoList.length
        ? this.currentPage * this.todosConfig.numOfTodosPerPage
        : this.filteredTodoList.length;

    this.filteredTodoPerPageList = this.filteredTodoList.slice(
      startIndex,
      endIndex
    );
  }

  ngOnDestroy(): void {
    this.todosListSub.unsubscribe();
  }
}
