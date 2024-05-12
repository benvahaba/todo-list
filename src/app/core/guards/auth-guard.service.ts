import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '../../features/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private userIsLogged: boolean;
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.userIsLogged = !!this.authService.loggedUser;
    if (!this.userIsLogged) {
      this.router.navigate(['/authentication']);
    }

    return this.userIsLogged;
  }
}

export const IsLoggedGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  debugger;
  return inject(AuthGuard).canActivate(next, state);
};
