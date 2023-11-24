import { TestBed } from '@angular/core/testing';

import { InterceptorHttpErrorService } from './interceptor-http-error.service';

describe('InterceptorHttpErrorService', () => {
  let service: InterceptorHttpErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorHttpErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
