import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services/authentication-services/jwt.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private jwtService: JwtService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Define URLs that should NOT have the auth header
    const excludedUrls = ['/api/auth/'];

    const isExcluded = excludedUrls.some(url => req.url.includes(url));

    const token = this.jwtService.getToken();


    // If token exists, clone the request and add Authorization header
    if (token && !isExcluded) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(clonedRequest);
    }

    // // If no token, send the original request
     return next.handle(req);
  }


}
