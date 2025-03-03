import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationFormComponent } from './components/user-registration-form/user-registration-form.component';  // Import the component
import { UserLoginComponent } from './components/user-login/user-login.component';

const routes: Routes = [
  { path: 'user-login', component: UserLoginComponent },
  { path: 'user-registration', component: UserRegistrationFormComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
