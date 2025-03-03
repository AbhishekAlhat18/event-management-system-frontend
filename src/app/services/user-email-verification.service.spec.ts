import { TestBed } from '@angular/core/testing';

import { UserEmailVerificationService } from './user-email-verification.service';

describe('UserEmailVerificationService', () => {
  let service: UserEmailVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserEmailVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
