import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Utilisateur | null>;
  public currentUser: Observable<Utilisateur | null>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Safely get stored user, only in browser
    const storedUser = this.getStoredUser();
    this.currentUserSubject = new BehaviorSubject<Utilisateur | null>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getStoredUser(): Utilisateur | null {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const userJson = localStorage.getItem('currentUser');
        return userJson ? JSON.parse(userJson) : null;
      } catch {
        return null;
      }
    }
    return null;
  }

  public get currentUserValue(): Utilisateur | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string, rememberMe: boolean = false): Observable<Utilisateur> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password, rememberMe })
      .pipe(map(response => {
        // Store user details and jwt token in local storage only in browser
        if (isPlatformBrowser(this.platformId)) {
          try {
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);
          } catch {}
        }
        this.currentUserSubject.next(response.user);
        return response.user;
      }));
  }

  register(userData: {
    nom: string, 
    prenom: string, 
    email: string, 
    password: string
  }): Observable<Utilisateur> {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, userData)
      .pipe(map(response => {
        // Store user details and jwt token in local storage only in browser
        if (isPlatformBrowser(this.platformId)) {
          try {
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);
          } catch {}
        }
        this.currentUserSubject.next(response.user);
        return response.user;
      }));
  }

  logout(): void {
    // Remove user from local storage only in browser
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
      } catch {}
    }
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    // Check authentication only in browser
    if (isPlatformBrowser(this.platformId)) {
      try {
        return !!localStorage.getItem('token');
      } catch {
        return false;
      }
    }
    return false;
  }
}