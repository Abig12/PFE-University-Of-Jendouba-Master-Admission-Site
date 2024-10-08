import { TestBed } from '@angular/core/testing';

import { GuardadmineetGuard } from './guardadmineet.guard';

describe('GuardadmineetGuard', () => {
  let guard: GuardadmineetGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardadmineetGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
