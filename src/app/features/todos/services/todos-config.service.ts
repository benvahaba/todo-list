import { Injectable } from '@angular/core';
import {
  LocalStorageKeys,
  LocalStorageService,
} from '../../../shared/services/local-storage.service';
import { AppSettingsService } from '../../../core/services/app-settings.service';
import { TodosConfig } from '../../../types/todo/todos-config';

@Injectable({
  providedIn: 'root',
})
export class TodosConfigService {
  constructor(private localStorageService: LocalStorageService) {}

  get todosConfig(): TodosConfig {
    let localTodosConfig = this.localStorageService.getItem(
      LocalStorageKeys.todosConfig
    );

    if (localTodosConfig === null) {
      const defaultTodosConfig = AppSettingsService.todosConfig;

      this.todosConfig = defaultTodosConfig;
      localTodosConfig = defaultTodosConfig;
    }

    return localTodosConfig;
  }

  set todosConfig(todosConfig: TodosConfig) {
    this.localStorageService.setItem(LocalStorageKeys.todosConfig, todosConfig);
  }
}
