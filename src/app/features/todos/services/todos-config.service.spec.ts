import { TestBed } from '@angular/core/testing';

import { TodosConfigService } from './todos-config.service';

describe('TodosConfigService', () => {
  let service: TodosConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodosConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
