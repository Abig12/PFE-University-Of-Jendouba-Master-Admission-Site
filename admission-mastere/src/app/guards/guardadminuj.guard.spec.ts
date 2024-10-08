import { TestBed } from '@angular/core/testing';

import { GuardadminujGuard } from './guardadminuj.guard';

describe('GuardadminujGuard', () => {
  let guard: GuardadminujGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardadminujGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
