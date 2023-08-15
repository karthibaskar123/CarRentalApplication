import { TestBed } from '@angular/core/testing';

import { ExceptioninterceptorInterceptor } from './exceptioninterceptor.interceptor';

describe('ExceptioninterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ExceptioninterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ExceptioninterceptorInterceptor = TestBed.inject(ExceptioninterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
