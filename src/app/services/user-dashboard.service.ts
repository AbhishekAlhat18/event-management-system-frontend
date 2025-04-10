import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';


// Interface for the user profile response
export interface UserProfile {
  userId: number;
  email: string;
  username: string;
  roles: string[];
  emailVerificationStatus: string;
  enabled: boolean;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: { authority: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {

  private apiUrl: string = 'http://localhost:8080/api/users/profile';

  constructor(private http: HttpClient) { }

    // Get just the username
    getUsername(): Observable<string> {
      return this.http.get<UserProfile>(`${this.apiUrl}`).pipe(
        map(response => response.username),
        catchError(this.handleError)
      );
    }

    private handleError(error: HttpErrorResponse) {
      let errorMessage = 'An unknown error occurred!';
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    }
}
