import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, timer } from 'rxjs';
import { Toast } from '../../types/toast/toast';
import { AppSettingsService } from '../../core/services/app-settings.service';

@Injectable({
  providedIn: 'root',
})
export class ToastsService {
  private _toastsSub: BehaviorSubject<Toast[]>;
  public toastObs: Observable<Toast[]>;
  constructor() {
    this._toastsSub = new BehaviorSubject<Toast[]>([]);
    this.toastObs = this._toastsSub.asObservable();
  }

  public addToast(toast: Toast) {
    const toastArray = this._toastsSub.value;
    toast.date = new Date();

    toastArray.push(toast);
    this._toastsSub.next(toastArray);

    if (!toast.timeInMilli && !toast.noTimer) {
      toast.timeInMilli = AppSettingsService.toasts.defaultTimeInMilli;
    }

    if (!!toast.timeInMilli) {
      timer(toast.timeInMilli).subscribe(() => {
        this.removeToast(toast);
      });
    }
  }

  public removeToast(toast: Toast) {
    const toastArray = this._toastsSub.value;
    const index = toastArray.indexOf(toast, 0);
    if (index > -1) {
      toastArray.splice(index, 1);
      this._toastsSub.next(toastArray);
    }
  }

  public get toast() {
    return this.toastObs;
  }
}
