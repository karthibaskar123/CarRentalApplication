import { TestBed } from '@angular/core/testing';

import { MybookingService } from './mybooking.service';

describe('MybookingService', () => {
  let service: MybookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MybookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
