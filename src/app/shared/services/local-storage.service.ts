import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  // Set a value in local storage
  public setItem(key: LocalStorageKeys, data): void {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key.toString(), jsonData);
  }

  // Get a value from local storage
  public getItem(key: LocalStorageKeys) {
    return JSON.parse(localStorage.getItem(key.toString()));
  }

  // Remove a value from local storage
  public removeItem(key: LocalStorageKeys): void {
    localStorage.removeItem(key.toString());
  }

  // Clear all items from local storage
  public clear(): void {
    localStorage.clear();
  }
}

export enum LocalStorageKeys {
  user = 'user',
  todosConfig = 'todosConfig',
}
