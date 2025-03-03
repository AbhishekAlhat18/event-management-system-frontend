import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import {map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserLoginServiceService {


  private loginUrl = 'http://localhost:8080/login'; // Your Spring Security backend login URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('username', email)
      .set('password', password);
      
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
      
    return this.http.post(this.loginUrl, body.toString(), {
      headers,
      withCredentials: true,
      observe: 'response'
    }).pipe(
      map(response => response.body),
      catchError(error => {
        console.error('Login error', error);
        return throwError(() => new Error(error.error?.message || 'Login failed'));
      })
    );
  }
}
