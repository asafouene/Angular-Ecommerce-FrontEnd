import { TestBed } from '@angular/core/testing';

import { LoginAthGuard } from './login-ath.guard';

describe('LoginAthGuard', () => {
  let guard: LoginAthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginAthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
