import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResendVerificationCodeComponent } from '../resend-verification-code/resend-verification-code.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailVerification } from '../../models/email-verification';
import { UserEmailVerificationService } from '../../services/user-email-verification.service';



@Component({
  selector: 'app-user-email-verification',
  standalone: false,
  
  templateUrl: './user-email-verification.component.html',
  styleUrl: './user-email-verification.component.css'
})
export class UserEmailVerificationComponent {
  validationForm!: FormGroup;
  userEmailVerification!: EmailVerification;
  
  

  constructor(private fb: FormBuilder,
    private dialog: MatDialog, 
    public dialogRef: MatDialogRef<UserEmailVerificationComponent>,  // To control Mat dialog
    @Inject(MAT_DIALOG_DATA) public data: { email: string },
    private userEmailVerificationService: UserEmailVerificationService,
    private snackBar: MatSnackBar

  ) {}

  ngOnInit() {
    this.validationForm = this.fb.group({
      input1: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
      input2: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
      input3: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
      input4: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
      input5: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
      input6: ['', [Validators.required, Validators.pattern('[0-9]{1}')]],
    });

    this.userEmailVerification = {
      email: '',
      verificationCode: ''
    };
  }
  moveToNext(nextInput: HTMLInputElement | null, prevInput: HTMLInputElement | null, event: any) {
    if (event.target.value && nextInput) {
      nextInput.focus(); // Move focus to next input
    } 
  
  }
  
  handleBackspace(currentInput: HTMLInputElement, prevInput: HTMLInputElement | null, nextInput: HTMLInputElement | null, event: KeyboardEvent) {
    if (event.key === 'Backspace' && !currentInput.value && prevInput) {
      prevInput.focus(); // Move focus to previous input when deleting
    }
  }

  
  verifyCode() {
    if (this.validationForm.valid) {
      this.userEmailVerification.email = this.data.email;
      this.userEmailVerification.verificationCode = this.concatenateInputs();
      console.log(this.userEmailVerification);
      this.userEmailVerificationService.sendVerificationCode(this.userEmailVerification).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.snackBar.open(
              response,
              'Close',
              { duration: 5000 }
            );
            this.dialogRef.close();
          },

          error: (error)=>{
            alert(error);
          }
        }
      )
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
      this.validationForm.get('input6')?.value
    ];

    return values.join('');  // Concatenate the values into a single string
  }

  resendCode() {
    this.dialogRef.close();

    this.dialog.open(ResendVerificationCodeComponent, {
      width: '400px', // Adjust size as needed
      data: { email: this.data.email }, // Pass user email if needed
    });
  }

}
