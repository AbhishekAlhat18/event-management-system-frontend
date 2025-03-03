import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEmailVerificationComponent } from './user-email-verification.component';

describe('UserEmailValidationComponent', () => {
  let component: UserEmailVerificationComponent;
  let fixture: ComponentFixture<UserEmailVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserEmailVerificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
