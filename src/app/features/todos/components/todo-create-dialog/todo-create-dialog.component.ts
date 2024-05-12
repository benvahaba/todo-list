import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from '../../../../types/todo/todo';

@Component({
  selector: 'app-todo-create-dialog',
  templateUrl: './todo-create-dialog.component.html',
  styleUrl: './todo-create-dialog.component.scss',
})
export class TodoCreateDialogComponent implements OnInit {
  @Input({
    required: true,
  })
  userId: number;
  @Output() onCreateTodo = new EventEmitter<Todo>();
  public title: string;

  ngOnInit(): void {
    this.title = '';
  }

  public onSubmit(form: NgForm, title) {
    form.reset();

    const todo: Todo = {
      title: title,
      userId: this.userId,
      completed: false,
    };

    this.onCreateTodo.emit(todo);
  }
}
