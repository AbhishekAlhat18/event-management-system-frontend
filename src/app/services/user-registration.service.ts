import { Injectable } from '@angular/core';
import { UserRegistration } from '../models/user-registration';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', // This makes the service available globally
})
export class UserRegistrationService {
  private apiUrl: string = 'http://localhost:8080/api/register/user';

  constructor(private http: HttpClient) {}

  registerUser(userRegistrationDetails: UserRegistration): Observable<any> {
    return this.http.post(this.apiUrl, userRegistrationDetails).pipe(
      catchError((error: HttpErrorResponse) => {

        // Handle the error here and throw a user-friendly message
        let errorMessage =
          'An unexpected error occurred. Please try again later.';

        if (error.status === 400) {
          errorMessage = error.error.message;
        } else if (error.status === 409) {
          errorMessage = error.error.message;
        } else if (error.status === 500) {
          errorMessage = error.error.message;
        }

        // Return a user-friendly error message
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
