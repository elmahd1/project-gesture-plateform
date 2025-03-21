import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar" [class.sidebar--collapsed]="isCollapsed">
      <div class="sidebar__header">
        <a routerLink="/dashboard" class="sidebar__logo">

        </a>
        <button class="sidebar__toggle" (click)="onToggleSidebar()">
          <i *ngIf="isCollapsed" class="fas fa-angle-right"></i>
          <i *ngIf="!isCollapsed" class="fas fa-angle-left"></i>
        </button>
      </div>
      
      <div class="sidebar__content">
        <div class="sidebar__user" *ngIf="!isCollapsed">
          <div class="sidebar__user-avatar">
            <div class="sidebar__user-initial">J</div>
          </div>
          <div class="sidebar__user-info">
            <h4 class="sidebar__user-name">John Doe</h4>
            <p class="sidebar__user-role">Administrator</p>
          </div>
        </div>
        
        <nav class="sidebar__nav">
          <ul class="sidebar__nav-list">
            <li class="sidebar__nav-item">
              <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="sidebar__nav-link">
                <i class="fas fa-tachometer-alt sidebar__nav-icon"></i>
                <span class="sidebar__nav-text" *ngIf="!isCollapsed">Dashboard</span>
              </a>
            </li>
            <li class="sidebar__nav-item">
              <a routerLink="/projects" routerLinkActive="active" class="sidebar__nav-link">
                <i class="fas fa-project-diagram sidebar__nav-icon"></i>
                <span class="sidebar__nav-text" *ngIf="!isCollapsed">Projects</span>
              </a>
            </li>
            <li class="sidebar__nav-item">
              <a routerLink="/tasks" routerLinkActive="active" class="sidebar__nav-link">
                <i class="fas fa-tasks sidebar__nav-icon"></i>
                <span class="sidebar__nav-text" *ngIf="!isCollapsed">Tasks</span>
              </a>
            </li>
            <li class="sidebar__nav-item">
              <a routerLink="/tasks/calendar" routerLinkActive="active" class="sidebar__nav-link">
                <i class="fas fa-calendar-alt sidebar__nav-icon"></i>
                <span class="sidebar__nav-text" *ngIf="!isCollapsed">Calendar</span>
              </a>
            </li>
            <li class="sidebar__nav-item">
              <a routerLink="/users" routerLinkActive="active" class="sidebar__nav-link">
                <i class="fas fa-users sidebar__nav-icon"></i>
                <span class="sidebar__nav-text" *ngIf="!isCollapsed">Team</span>
              </a>
            </li>
            <li class="sidebar__nav-item">
              <a routerLink="/reports" routerLinkActive="active" class="sidebar__nav-link">
                <i class="fas fa-chart-bar sidebar__nav-icon"></i>
                <span class="sidebar__nav-text" *ngIf="!isCollapsed">Reports</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      
      <div class="sidebar__footer">
        <a routerLink="/settings" routerLinkActive="active" class="sidebar__footer-link">
          <i class="fas fa-cog sidebar__footer-icon"></i>
          <span class="sidebar__footer-text" *ngIf="!isCollapsed">Settings</span>
        </a>
        <button (click)="logout()" class="sidebar__footer-link">
          <i class="fas fa-sign-out-alt sidebar__footer-icon"></i>
          <span class="sidebar__footer-text" *ngIf="!isCollapsed">Logout</span>
        </button>
      </div>
    </aside>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isCollapsed: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor() {}

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
  
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    window.location.href = '/login';
  }
}