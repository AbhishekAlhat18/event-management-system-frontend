import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {


  constructor() { }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  setToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  clearToken(): void {
    localStorage.removeItem('accessToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  //add decode logic here
}
