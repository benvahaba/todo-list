import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../../../types/todo/todo';

@Component({
  selector: 'app-todos-table',
  templateUrl: './todos-table.component.html',
  styleUrl: './todos-table.component.scss',
})
export class TodosTableComponent {
  @Input({
    required: true,
  })
  todosList: Todo[] = [];
  @Output()
  todoChanged = new EventEmitter<Todo>();

  onTodoCheckedChange(event: Event, todo: Todo) {
    event.target['checked'] = todo.completed;
    let todoCopy: Todo = JSON.parse(JSON.stringify(todo));
    todoCopy.completed = !todoCopy.completed;
    this.todoChanged.emit(todoCopy);
  }

  public trackById(index: number, el: any): number {
    return el.id;
  }
}
