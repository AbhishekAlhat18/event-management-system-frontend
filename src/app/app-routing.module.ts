import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationFormComponent } from './components/authentication/user-registration-form/user-registration-form.component';  // Import the component
import { UserLoginComponent } from '../app/components/authentication/user-login/user-login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OrganizerOnboardingComponent } from './components/organizer/organizer-onboarding/organizer-onboarding.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {path:'homepage', component: HomepageComponent},
  { path: 'user-login', component: UserLoginComponent },
  { path: 'user-registration', component: UserRegistrationFormComponent},
  {path:'organizer-onboarding',component: OrganizerOnboardingComponent},
  {path:'user-dashboard',component: UserDashboardComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
