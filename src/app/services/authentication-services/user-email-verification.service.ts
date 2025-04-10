import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map, Observable,throwError } from 'rxjs';

import{EmailVerification} from '../../models/email-verification';
import { ApiResponse } from '../../models/api-response';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserEmailVerificationService {

    private apiUrl: string = 'http://localhost:8080/api/verify-email/user';
  
    constructor(private http: HttpClient) {}

    sendVerificationCode(userEmailVerificationDetails: EmailVerification): Observable<any> {
      const params = new HttpParams()
      .set('email', userEmailVerificationDetails.email)
      .set('token', userEmailVerificationDetails.verificationCode);
        return this.http.post<ApiResponse<void>>(`${this.apiUrl}`,null, { params, observe: 'response'})
        .pipe(
          map(response => {
            if (response.status === 200) {
              return response.body!.message;
            }
             return ;
          }),
          catchError(
            (error: HttpErrorResponse) => {
              let errorMessage = 'An unexpected error occurred. Please try again later.';
              errorMessage = error.error.message;
              return throwError(() => new Error(errorMessage));
            }
          )
        )


    }


}
