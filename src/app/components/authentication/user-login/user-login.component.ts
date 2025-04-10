import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserLoginServiceService } from '../../../services/authentication-services/user-login-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountNotActivatedDialogComponent } from '../account-not-activated-dialog/account-not-activated-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLogin } from '../../../models/user-login';
import { ToastComponent } from '../../toast/toast.component';



@Component({
  selector: 'app-user-login',
  standalone: false,

  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent {
  loginForm: FormGroup;
  hidePassword: boolean = true; // To toggle password visibility
  errorMessage: string | null = null; //errorMessage can be of type string or null and its initial value for type null is null

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog, // Inject MatDialog
    private router: Router,
    private snackBar: MatSnackBar,
    private userLoginService: UserLoginServiceService
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          ),
        ],
      ],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  

  // Method to toggle password visibility
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  // Method to handle login submission
  onLogin() {

    const formData: UserLogin = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    if (this.loginForm.valid) {
      this.userLoginService
        .login(formData)
        .subscribe({
          next: (response) => {
            this.snackBar.openFromComponent(ToastComponent, {
              duration: 5000,
              data: { message: response, duration: 5000 },
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['snackbar-success'] // This applies the fix above
            });
            
            
            
            //this.snackBar.open(response, 'Close', { duration: 5000 ,panelClass: ['snackbar-success']});
            // Navigate to the dashboard or another page after successful login
            this.router.navigate(['/user-dashboard']);
          },
          error: (error) => {
            // this.errorMessage = error.message  //property of error object of Error Class in javaScript
            if (error.status === 403) {
              this.dialog.open(AccountNotActivatedDialogComponent, {
                width: '400px',
                data: {
                  unVerifiedEmail: this.loginForm.get('email')?.value,
                },
              });
            }
            if (error.status === 401) {
              this.errorMessage = error.error.message;
            }
          },
        });
    } else {
      this.errorMessage = 'Invalid Form';
    }
  }
}
