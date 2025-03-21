import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Set a mock user for development
    this.currentUserSubject.next({
      id: 1,
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      role: 'admin',
      avatar: 'assets/images/user-avatar.jpg',
      status: 'online'
    });
  }

  // Add isAuthenticated method
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  // Add login method
  login(email: string, password: string, rememberMe: boolean = false): Observable<User> {
    const user: User = {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      role: 'admin',
      avatar: 'assets/images/user-avatar.jpg',
      status: 'online'
    };
    
    this.currentUserSubject.next(user);
    return of(user);
  }

  // Add register method
  register(userData: Partial<User>): Observable<User> {
    const user: User = {
      id: 2,
      name: userData.name || 'Nouvel Utilisateur',
      email: userData.email || '',
      role: 'user',
      avatar: 'assets/images/default-avatar.jpg',
      status: 'online'
    };
    
    this.currentUserSubject.next(user);
    return of(user);
  }

  // Social login methods
  loginWithGoogle(): Observable<User> {
    const user: User = {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      role: 'admin',
      avatar: 'assets/images/user-avatar.jpg',
      status: 'online'
    };
    
    this.currentUserSubject.next(user);
    return of(user);
  }

  loginWithMicrosoft(): Observable<User> {
    const user: User = {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      role: 'admin',
      avatar: 'assets/images/user-avatar.jpg',
      status: 'online'
    };
    
    this.currentUserSubject.next(user);
    return of(user);
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }
  forgotPassword(email: string): Observable<{ message: string }> {
    // Mock forgot password
    return of({ message: 'Un email de réinitialisation a été envoyé.' });
  }

  resetPassword(token: string, newPassword: string): Observable<{ message: string }> {
    // Mock reset password
    return of({ message: 'Mot de passe réinitialisé avec succès.' });
  }
}