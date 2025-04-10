import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import {map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse } from '../../models/api-response';
import { UserLogin } from '../../models/user-login';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken }  from '../../models/decoded-token';



@Injectable({
  providedIn: 'root'
})
export class UserLoginServiceService {


  private loginUrl = 'http://localhost:8080/api/auth/login'; // Your Spring Security backend login URL

  constructor(private http: HttpClient) {}

  login(userLoginDetails:UserLogin): Observable<any> {
    const body = new HttpParams()
      // .set('username', email)
      // .set('password', password);
      
    // const headers = new HttpHeaders()
    //   .set('Content-Type', 'application/x-www-form-urlencoded');
      
    return this.http.post<ApiResponse<void>>(this.loginUrl, userLoginDetails, {

      withCredentials: true,
      observe: 'response'
    }).pipe(
      map(response => {
        if(response.status === 200){
          const token = response.body?.accessToken;
          if (token) {
            localStorage.setItem('accessToken', token);

            // Optionally decode and store user info if needed globally
            const decoded = jwtDecode<DecodedToken>(token);
            localStorage.setItem('user_info', JSON.stringify(decoded));
            console.log(`decoded: `, decoded);
            

            return response.body?.message;
          }
        } 
        return ;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getDecodedUser(): DecodedToken | null {
    const token = this.getToken();
    if (token) {
      return jwtDecode<DecodedToken>(token);
    }
    return null;
  }
}
