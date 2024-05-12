import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [ErrorPageComponent, PaginationComponent, ToastComponent],
  imports: [CommonModule],
  exports: [
    CommonModule,
    ErrorPageComponent,
    PaginationComponent,
    ToastComponent,
  ],
})
export class SharedModule {}
