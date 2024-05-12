import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss',
})
export class ErrorPageComponent {
  private userIsLogged: boolean;
  public constructor(private router: Router, private authService: AuthService) {
    this.userIsLogged = !!this.authService.loggedUser;
  }
  public onReNavigateClicked() {
    debugger;
    this.userIsLogged
      ? this.router.navigate(['/todos'])
      : this.router.navigate(['/authentication']);
  }
}
