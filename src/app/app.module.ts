import { NgModule } from '@angular/core';   //Important for two-way binding
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserRegistrationFormComponent } from './components/user-registration-form/user-registration-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { MatDialogModule } from '@angular/material/dialog'; // For dialog pop-up
import { MatInputModule } from '@angular/material/input'; // For input fields
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { UserEmailVerificationComponent } from './components/user-email-verification/user-email-verification.component';
import { ResendVerificationCodeComponent } from './components/resend-verification-code/resend-verification-code.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [      //Components here
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginComponent,
    UserEmailVerificationComponent,
    ResendVerificationCodeComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
