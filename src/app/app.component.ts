import { Component, ChangeDetectorRef } from '@angular/core';
import {UserRegistration} from './models/user-registration';
import { UserRegistrationService } from './services/user-registration.service';
import { NgModel } from '@angular/forms';


import { MatDialog } from '@angular/material/dialog';
import { UserEmailVerificationComponent } from './components/user-email-verification/user-email-verification.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  user: UserRegistration = {    
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNumber: ''


  };    //By creating Interface we ensure type safety that user object should contain all fields defined inside the interface "UserRegistration"
  
constructor(private userRegistrationService: UserRegistrationService, private cd: ChangeDetectorRef, private dialog: MatDialog){}


isFirstNameOnlyWhitespace: boolean = false;


//  // Method to check for whitespace
//  hasWhitespace(value: string): boolean {
//   return value.trim().indexOf(' ') !== -1;
// }



openValidationPopup() {
  this.dialog.open(UserEmailVerificationComponent, {
    width: '400px',
    data: { email: 'test@example.com' }
  });
}


validateFirstName(firstNameRef: NgModel) {
  console.log(firstNameRef.value);
  console.log(this.isFirstNameOnlyWhitespace);
  this.isFirstNameOnlyWhitespace = firstNameRef.value.trim().length === 0;
  console.log(this.isFirstNameOnlyWhitespace);
  this.cd.detectChanges();  // Manually trigger UI update
}


isLastNameOnlyWhitespace: boolean = false;

validateLastName() {
  this.isLastNameOnlyWhitespace = this.user.lastName?.trim().length === 0;
}



  onSubmit() {

 }
}
