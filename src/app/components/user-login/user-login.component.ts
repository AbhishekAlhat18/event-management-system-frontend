import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserLoginServiceService } from '../../services/user-login-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-login',
  standalone: false,

  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent {
  loginForm: FormGroup;
  hidePassword: boolean = true; // To toggle password visibility

  constructor(
    private fb: FormBuilder,
    private router: Router,
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
    if (this.loginForm.valid) {
      this.userLoginService
        .login(
          this.loginForm.get('email')?.value,
          this.loginForm.get('password')?.value
        )
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
          },
        });

      // Navigate to the dashboard or another page after successful login
      // this.router.navigate(['/dashboard']);
    } else {
      console.log('Invalid Form');
    }
  }
}
