import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { UserRequestsService } from '../../../apis/user-requests.service';
import {
  LocalStorageKeys,
  LocalStorageService,
} from '../../../shared/services/local-storage.service';
import { Router } from '@angular/router';
import { Address } from '../../../types/address/address';
import { User } from '../../../types/user/user';
import { ToastsService } from '../../../shared/services/toasts.service';
import { Toast } from '../../../types/toast/toast';
import { ToastTheme } from '../../../types/toast/toast-theme';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _loggedUserSub;
  public readonly loggedUserObs: Observable<User>;

  constructor(
    public http: HttpClient,
    private userRequestsService: UserRequestsService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private toastsService: ToastsService
  ) {
    const user = this.userInLocalStorage;
    this._loggedUserSub = new BehaviorSubject<User>(user ? user : null);
    this.loggedUserObs = this._loggedUserSub.asObservable();
  }

  public signUp(
    name: string,
    userName: string,
    address: Address,
    email: string
  ): Observable<Boolean> {
    return new Observable((observer: Observer<boolean>) => {
      this.userRequestsService
        .signUp(name, userName, address, email)
        .subscribe({
          next: (user: User) => {
            observer.next(true);
            this.userInLocalStorage = user;
            this._loggedUserSub.next(user);

            const toast: Toast = {
              header: `Congratulations ${user.name}`,
              body: ['You have successfully registered'],
              theme: ToastTheme.SUCCESS,
            };

            this.toastsService.addToast(toast);
          },
          error: (err) => {
            const toast: Toast = {
              header: `Oops`,
              body: [err],
              theme: ToastTheme.DANGER,
            };

            this.toastsService.addToast(toast);
          },
        });
    });
  }

  public loggin(userName: string, email: string): Observable<Boolean> {
    return new Observable((observer: Observer<boolean>) => {
      this.userRequestsService.getAllUsers().subscribe({
        next: (usersList: User[]) => {
          const user = usersList.find(
            (user: User) => user.email === email && user.username === userName
          );

          if (user) {
            observer.next(true);
            this.userInLocalStorage = user;
            this._loggedUserSub.next(user);

            const toast: Toast = {
              header: `Welcome back ${user.name}`,
              body: ['You have successfully Logged in'],
              theme: ToastTheme.SUCCESS,
            };

            this.toastsService.addToast(toast);
          } else {
            const errorMessage = 'User does not exists';
            observer.error(errorMessage);
            this._loggedUserSub.next(null);

            const toast: Toast = {
              header: `Oops`,
              body: [errorMessage],
              theme: ToastTheme.DANGER,
            };

            this.toastsService.addToast(toast);
          }
        },
        error: (err) => {
          observer.error(err);
          this._loggedUserSub.next(null);

          const toast: Toast = {
            header: `Oops`,
            body: [err],
            theme: ToastTheme.DANGER,
          };

          this.toastsService.addToast(toast);
        },
      });
    });
  }

  public signOut() {
    this.removeUserLocalStorage();
    this._loggedUserSub.next(null);
    const toast: Toast = {
      header: `Good bye`,
      body: ['You have logged out successfully'],
      theme: ToastTheme.SUCCESS,
    };

    this.toastsService.addToast(toast);
    this.router.navigate(['/authentication']);
  }

  public get loggedUser(): User {
    return this._loggedUserSub.getValue();
  }

  private set loggedUser(user: User) {
    this.userInLocalStorage = user;
    this._loggedUserSub.next(user);
  }

  private get userInLocalStorage(): User {
    return this.localStorageService.getItem(LocalStorageKeys.user) as User;
  }

  private set userInLocalStorage(user: User) {
    this.localStorageService.setItem(LocalStorageKeys.user, user);
  }

  private removeUserLocalStorage() {
    this.localStorageService.removeItem(LocalStorageKeys.user);
  }
}
