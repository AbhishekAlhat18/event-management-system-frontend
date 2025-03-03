import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { map, Observable,throwError } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserResendVerificationCodeService {
  private apiUrl: string =
    'http://localhost:8080/api/resend-activation-email/user';

  constructor(private http: HttpClient) {}

  resendVerificatrionCode(email: string): Observable<string> {
    const params = new HttpParams().set('email', email);
    return this.http
      .put<ApiResponse<void>>(`${this.apiUrl}`, null, { params })
      .pipe(
        map((response) => response.message),
        catchError((error: HttpErrorResponse) => {
          let errorMessage =
            'An unexpected error occurred. Please try again later.';
          errorMessage = error.error.message;
          return throwError(() => new Error(errorMessage));
        })
      );
  }
}
