import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNotActivatedDialogComponent } from './account-not-activated-dialog.component';

describe('AccountNotActivatedDialogComponent', () => {
  let component: AccountNotActivatedDialogComponent;
  let fixture: ComponentFixture<AccountNotActivatedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountNotActivatedDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountNotActivatedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
