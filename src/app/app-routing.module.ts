import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './features/auth/components/authentication.component';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
import { IsLoggedGuard } from './core/guards/auth-guard.service';
import { TodosPageComponent } from './features/todos/components/todos-page/todos-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/authentication',
    pathMatch: 'full',
  },

  {
    path: 'authentication',
    component: AuthenticationComponent,
  },
  {
    path: 'todos',
    component: TodosPageComponent,
    canActivate: [IsLoggedGuard],
  },

  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not found!' },
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
