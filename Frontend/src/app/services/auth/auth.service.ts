import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { URLService } from '../url/url.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = URLService.BackendURL + '/api/user/login'; // Your login endpoint
  private tokenKey = 'auth_token'; // Key to store JWT token in localStorage
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Check if token exists on page load, if so, decode it and set the user
    const storedToken = localStorage.getItem(this.tokenKey);
    if (storedToken) {
      this.setCurrentUser(storedToken);
    }
  }

  login(username: string, pin: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, pin }).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);  // ✅ Store token in localStorage
          this.setCurrentUser(response.token);  // ✅ Set current user state
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['']);
  }

  setCurrentUser(token: string): void {
    const decodedToken = this.decodeJwt(token);
    this.currentUserSubject.next({
      username: decodedToken.name,
      id: decodedToken.id,
      isAdmin: decodedToken.isAdmin,
    });
  }

  decodeJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));
    return JSON.parse(jsonPayload);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const currentUser = this.currentUserSubject.value;
    return currentUser && currentUser.isAdmin;
  }
}
