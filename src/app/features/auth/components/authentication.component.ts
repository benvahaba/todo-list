import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Address } from '../../../types/address/address';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  public isSignIn: boolean = true;
  public userName: string = '';
  public email: string = '';
  public name: string = '';
  public address!: Address;
  public isLoading = false;
  public errorMessage: string = '';
  private authSub?: Subscription;
  private authObs?: Observable<any>;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.address = { street: '', city: '', zipcode: '' };
  }

  public onSubmit(
    form: NgForm,
    userName: string,
    email: string,
    name: string,
    address: Address
  ) {
    this.isLoading = true;
    this.errorMessage = '';

    this.authObs = this.isSignIn
      ? this.authService.loggin(userName, email)
      : this.authService.signUp(name, userName, address, email);
    this.authSub = this.authObs.subscribe({
      next: (resData) => {
        this.isLoading = false;
        this.errorMessage = '';
        debugger;
        this.router.navigate(['/todos']);
      },
      error: (errorMessage) => {
        this.isLoading = false;
        this.errorMessage = errorMessage;
        this.authSub?.unsubscribe();
      },
    });

    form.reset();
  }

  public onChangeAuthMethod() {
    this.isSignIn = !this.isSignIn;
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }
}
