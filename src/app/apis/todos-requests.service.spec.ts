import { TestBed } from '@angular/core/testing';

import { TodosRequestsService } from './todos-requests.service';

describe('TodosService', () => {
  let service: TodosRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodosRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
