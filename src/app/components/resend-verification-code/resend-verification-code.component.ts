import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserEmailVerificationComponent } from '../user-email-verification/user-email-verification.component';
import {UserResendVerificationCodeService} from '../../services/user-resend-verification-code.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-resend-verification-code',
  standalone: false,
  
  templateUrl: './resend-verification-code.component.html',
  styleUrl: './resend-verification-code.component.css'
})
export class ResendVerificationCodeComponent {
  resendCodeToEmail: string;

  constructor(
    private dialog: MatDialog, // Inject MatDialog
    public dialogRef: MatDialogRef<ResendVerificationCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string },
    private userResendVerificationCode: UserResendVerificationCodeService,
    private snackBar: MatSnackBar ) {
    this.resendCodeToEmail = data.email;
    
  }


  resendCode(){
    this.dialogRef.close();
    this.userResendVerificationCode.resendVerificatrionCode(this.resendCodeToEmail).subscribe(
      {
        next: (response) =>{
          this.snackBar.open(
            response,
            'Close',
            { duration: 5000 }
          );
          this.dialog.open(UserEmailVerificationComponent,{
            width: '400px',
            data:{email: this.resendCodeToEmail}
          });

        },
      
        error: (error)=>{
        alert(error);
       }
      } 
    )

  }

}
