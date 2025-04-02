import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Utilisateur | null>(null);
  public currentUser = this.currentUserSubject.asObservable();
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Check for stored user on init, but only if in browser
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUserSubject.next(JSON.parse(storedUser));
      }
    }
  }
  
  login(email: string, password: string): Observable<Utilisateur> {
    // For now, mock login with hardcoded user
    const mockUser: Utilisateur = {
      id: 1,
      nom: 'Admin',
      prenom: 'User',
      email: email,
      role: 'ADMIN'
    };
    
    // Store user and return (only if in browser)
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      localStorage.setItem('token', 'mock-jwt-token');
    }
    
    this.currentUserSubject.next(mockUser);
    return of(mockUser);
  }
  
  register(userData: any): Observable<Utilisateur> {
    console.log('Registering user:', userData);
    const mockUser: Utilisateur = {
      id: 2,
      nom: userData.nom || 'New',
      prenom: userData.prenom || 'User',
      email: userData.email,
      role: 'MEMBRE'
    };
    
    // On successful registration, also log the user in (only if in browser)
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      localStorage.setItem('token', 'mock-jwt-token');
    }
    
    this.currentUserSubject.next(mockUser);
    return of(mockUser);
  }
  
  logout(): void {
    // Remove user from local storage and reset the subject
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    }
    
    this.currentUserSubject.next(null);
  }
  
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
  
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  forgotPassword(email: string): Observable<any> {
    console.log(`Password reset requested for: ${email}`);
    return of({ success: true, message: 'Password reset email sent' });
  }

  resetPassword(token: string, password: string): Observable<any> {
    console.log(`Resetting password with token: ${token}`);
    return of({ success: true, message: 'Password reset successfully' });
  }
}