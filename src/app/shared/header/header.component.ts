// src/app/shared/header/header.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header" [class.header--dashboard]="isDashboard">
      <div class="container">
        <div class="header__content">
          <a routerLink="/" class="header__logo">
            <span class="header__logo-text">  <br>Workflow</span>
          </a>

          <!-- Navigation menu for landing page -->
          <nav class="header__nav" *ngIf="!isDashboard" [class.header__nav--open]="isMenuOpen">
            <ul class="header__nav-list">
              <li class="header__nav-item"><a routerLink="/" fragment="features" class="header__nav-link">Features</a></li>
              <li class="header__nav-item"><a routerLink="/" fragment="solutions" class="header__nav-link">Solutions</a></li>
              <li class="header__nav-item"><a routerLink="/" fragment="pricing" class="header__nav-link">Pricing</a></li>
            </ul>
          </nav>

          <!-- User controls -->
          <div class="header__controls">
            <!-- Show these elements ONLY on landing page AND when not logged in -->
            <ng-container *ngIf="!isDashboard && !isLoggedIn">
              <a routerLink="/login" class="btn btn--text">Log In</a>
              <a routerLink="/register" class="btn btn--primary">Sign Up</a>
            </ng-container>
            
            <!-- Dashboard user menu -->
            <div class="header__user-menu" *ngIf="isLoggedIn && isDashboard">
              <div class="header__user">
                <span class="header__user-name">{{ username }}</span>
                <div class="header__user-initial">
                  {{ userInitial }}
                </div>
              </div>
              <div class="header__dropdown">
                <a routerLink="/users/profile" class="header__dropdown-item">Profile</a>
                <a routerLink="/settings" class="header__dropdown-item">Settings</a>
                <button (click)="logout()" class="header__dropdown-item header__dropdown-item--logout">Logout</button>
              </div>
            </div>

            <!-- ONLY if on landing page AND logged in, show a dashboard link -->
            <a *ngIf="!isDashboard && isLoggedIn" routerLink="/dashboard" class="btn btn--primary">Dashboard</a>
          </div>

          <!-- Mobile menu toggle -->
          <button class="header__menu-toggle" (click)="toggleMenu()">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isDashboard: boolean = false;
  isMenuOpen: boolean = false;
  
  // User state
  isLoggedIn: boolean = false;
  username: string = 'John Doe';
  userInitial: string = 'J';
  
  constructor(private router: Router) {}
  
  ngOnInit(): void {
    // Check if user is logged in - use simple localStorage check
    this.checkLoginState();
  }
  
  checkLoginState(): void {
    const token = localStorage.getItem('auth_token');
    this.isLoggedIn = !!token;
    
    // If there's user info in local storage, use it
    const userStr = localStorage.getItem('current_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.username = `${user.firstName} ${user.lastName}`;
        this.userInitial = user.firstName.charAt(0);
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    }
  }
  
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}