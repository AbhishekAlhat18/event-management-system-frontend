import { NgModule } from '@angular/core';   //Important for two-way binding
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserRegistrationFormComponent } from './components/authentication/user-registration-form/user-registration-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { UserLoginComponent } from './components/authentication/user-login/user-login.component';
import { MatDialogModule } from '@angular/material/dialog'; // For dialog pop-up
import { MatInputModule } from '@angular/material/input'; // For input fields
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { UserEmailVerificationComponent } from './components/authentication/user-email-verification/user-email-verification.component';
import { ResendVerificationCodeComponent } from './components/authentication/resend-verification-code/resend-verification-code.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AccountNotActivatedDialogComponent } from './components/authentication/account-not-activated-dialog/account-not-activated-dialog.component';
import { MatStepperModule } from '@angular/material/stepper';
import { OrganizerOnboardingComponent } from './components/organizer/organizer-onboarding/organizer-onboarding.component';
import { ToastComponent } from './components/toast/toast.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';


@NgModule({
  declarations: [      //Components here
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginComponent,
    UserEmailVerificationComponent,
    ResendVerificationCodeComponent,
    HomepageComponent,
    AccountNotActivatedDialogComponent,
    OrganizerOnboardingComponent,
    ToastComponent,
    UserDashboardComponent
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
    MatSnackBarModule,
    MatStepperModule,
    
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
