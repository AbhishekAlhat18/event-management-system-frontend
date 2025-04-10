import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UserEmailVerificationComponent } from '../user-email-verification/user-email-verification.component';

@Component({
  selector: 'app-account-not-activated-dialog',
  standalone: false,

  templateUrl: './account-not-activated-dialog.component.html',
  styleUrl: './account-not-activated-dialog.component.css',
})
export class AccountNotActivatedDialogComponent {
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AccountNotActivatedDialogComponent>, // To control Mat dialog
    @Inject(MAT_DIALOG_DATA) public data: { unVerifiedEmail: string }
  ) {}

  onVerifyEmailClick(): void {
    this.dialogRef.close(); // Close this dialog and trigger the OTP dialog
    this.dialog.open(UserEmailVerificationComponent, {
      width: '400px',
      data: { email: this.data.unVerifiedEmail },
    });
  }
}
