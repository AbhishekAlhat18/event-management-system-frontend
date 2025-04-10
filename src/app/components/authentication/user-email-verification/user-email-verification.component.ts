import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailVerification } from '../../../models/email-verification';
import { UserEmailVerificationService } from '../../../services/authentication-services/user-email-verification.service';
import { UserResendVerificationCodeService } from '../../../services/authentication-services/user-resend-verification-code.service';

@Component({
  selector: 'app-user-email-verification',
  standalone: false,

  templateUrl: './user-email-verification.component.html',
  styleUrl: './user-email-verification.component.css',
})
export class UserEmailVerificationComponent {
  validationForm!: FormGroup;
  userEmailVerification!: EmailVerification;
  errorMessage!: string

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<UserEmailVerificationComponent>, // To control Mat dialog
    @Inject(MAT_DIALOG_DATA) public data: { email: string },
    private userEmailVerificationService: UserEmailVerificationService,
    private userResendVerificationCode: UserResendVerificationCodeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.validationForm = this.fb.group({
      input1: ['', [Validators.required]],
      input2: ['', [Validators.required]],
      input3: ['', [Validators.required]],
      input4: ['', [Validators.required]],
      input5: ['', [Validators.required]],
      input6: ['', [Validators.required]],
    });

    this.userEmailVerification = {
      email: '',
      verificationCode: '',
    };
  }
  moveToNext(
    nextInput: HTMLInputElement | null,
    prevInput: HTMLInputElement | null,
    event: any
  ) {
    if (event.target.value && nextInput) {
      // Before moving focus, prevent validation on the target input
      // const inputName = nextInput.getAttribute('formControlName');
      // if (inputName) {
      //   this.validationForm.get(inputName)?.markAsUntouched();
      // }

      nextInput.focus(); // Move focus to next input
    }
  }

  handleBackspace(
    currentInput: HTMLInputElement,
    prevInput: HTMLInputElement | null,
    nextInput: HTMLInputElement | null,
    event: KeyboardEvent
  ) {
    if (event.key === 'Backspace' && !currentInput.value && prevInput) {
      prevInput.focus(); // Move focus to previous input when deleting
    }
  }

  verifyCode() {
    if (this.validationForm.valid) {
      this.userEmailVerification.email = this.data.email;
      this.userEmailVerification.verificationCode = this.concatenateInputs();
      this.userEmailVerificationService
        .sendVerificationCode(this.userEmailVerification)
        .subscribe({
          next: (response) => {
            this.snackBar.open(response, 'Close', { duration: 5000 ,panelClass: ['snackbar-success']});
            this.dialogRef.close();
          },

          error: (error) => {
            this.errorMessage = error.message
          },
        });
    }
  }

  // Method to concatenate form field values
  concatenateInputs(): string {
    const values = [
      this.validationForm.get('input1')?.value,
      this.validationForm.get('input2')?.value,
      this.validationForm.get('input3')?.value,
      this.validationForm.get('input4')?.value,
      this.validationForm.get('input5')?.value,
      this.validationForm.get('input6')?.value,
    ];

    return values.join(''); // Concatenate the values into a single string
  }

  resendCode() {
    this.userResendVerificationCode
      .resendVerificatrionCode(this.data.email)
      .subscribe({
        next: (response) => {
          this.snackBar.open(response, 'Close', {
            duration: 7000,
            panelClass: ['snackbar-success'],
          });
        },

        error: (error) => {
          alert(error);
        },
      });
  }
}
