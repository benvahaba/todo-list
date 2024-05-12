import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TodosModule } from './features/todos/todos.module';
import { SharedModule } from './shared/shared.module';
import { AuthenticationComponent } from './features/auth/components/authentication.component';

@NgModule({
  declarations: [AppComponent, AuthenticationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TodosModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
