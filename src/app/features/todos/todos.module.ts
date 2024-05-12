import { NgModule } from '@angular/core';
import { TodoCreateDialogComponent } from './components/todo-create-dialog/todo-create-dialog.component';
import { TodosPageComponent } from './components/todos-page/todos-page.component';
import { TodosTableComponent } from './components/todos-table/todos-table.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    TodoCreateDialogComponent,
    TodosPageComponent,
    TodosTableComponent,
  ],
  imports: [SharedModule, FormsModule],
  exports: [TodoCreateDialogComponent, TodosPageComponent, TodosTableComponent],
})
export class TodosModule {}
