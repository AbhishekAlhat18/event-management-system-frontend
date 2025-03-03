import { TestBed } from '@angular/core/testing';

import { UserResendVerificationCodeService } from './user-resend-verification-code.service';

describe('UserResendVerificationCodeService', () => {
  let service: UserResendVerificationCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserResendVerificationCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
