import { Component, OnInit } from '@angular/core'; // Basic component setup
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms'; // For form handling and validation and error handling using reactive forms
import { Router } from '@angular/router'; // To navigate to different routes
import { UserRegistrationService } from '../../../services/authentication-services/user-registration.service'; // Updated service
import { UserRegistration } from '../../../models/user-registration';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UserEmailVerificationComponent } from '../../authentication/user-email-verification/user-email-verification.component'

@Component({
  selector: 'app-user-registration-form',
  standalone: false,
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.css',
})
export class UserRegistrationFormComponent implements OnInit {
  registerForm!: FormGroup; //! Indicates that the property is definitely assigned
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private userRegistrationService: UserRegistrationService, // Updated service
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog // Inject MatDialog
  ) {}

  ngOnInit(): void {
    // Initializing the form with default values and validation
    this.registerForm = this.fb.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            this.noWhiteSpaceValidator(),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            ),
            Validators.maxLength(100),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(18),
            Validators.pattern(
              /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,18}$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
        contactNumber: [
          '',
          [Validators.required, Validators.pattern(/^\d{10}$/)],
        ],
        terms: [false, Validators.requiredTrue],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  noWhiteSpaceValidator(): Validators {
    return (control: AbstractControl): ValidationErrors | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { whitespace: true };
    };
  }

  // Custom Validator for Password Match
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  Register() {
    if (this.registerForm.valid) {

      // Explicitly map form values to UserRegistration interface
      const formData: UserRegistration = {
        firstName: this.registerForm.get('firstName')?.value,
        lastName: this.registerForm.get('lastName')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        contactNumber: this.registerForm.get('contactNumber')?.value,
      };

      this.userRegistrationService.registerUser(formData).subscribe(
         (response) => {
          this.registerForm.reset();
          this.snackBar.open(
            response.message,
            'Close',
            { duration: 5000 }
          );
          
          this.router.navigate(['/user-login']).then(() => {

            this.dialog.open(UserEmailVerificationComponent, {
              width: '400px', 
              data: { email: formData.email }, 

            });
          });
        },
        (error) => {
          this.registerForm.reset();
          this.snackBar.open(error.message, 'Close', { duration: 5000 });
        });
    }
  }
}
