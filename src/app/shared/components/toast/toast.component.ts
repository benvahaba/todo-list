import { Component, OnDestroy, OnInit } from '@angular/core';
import { Toast } from 'bootstrap';
import { ToastsService } from '../../services/toasts.service';
import { Subscription } from 'rxjs';
import { ToastTheme } from '../../../types/toast/toast-theme';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit, OnDestroy {
  private toastSub: Subscription;
  public toastsList: Toast[];
  public toastThemeTypes = ToastTheme;

  constructor(private toastsService: ToastsService) {}

  ngOnInit(): void {
    this.toastSub = this.toastsService.toast.subscribe({
      next: (toasts) => {
        this.toastsList = toasts;
      },
    });
  }

  public onRemoveToast(toast: Toast) {
    this.toastsService.removeToast(toast);
  }

  ngOnDestroy(): void {
    this.toastSub.unsubscribe();
  }
}
