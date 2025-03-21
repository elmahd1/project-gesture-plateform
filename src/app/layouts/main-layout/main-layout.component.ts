import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent],
  template: `
    <div class="main-layout" [class.main-layout--sidebar-collapsed]="sidebarCollapsed">
      <app-sidebar [isCollapsed]="sidebarCollapsed" (toggleSidebar)="toggleSidebar()"></app-sidebar>
      
      <div class="main-layout__content">
        <app-header [isDashboard]="true"></app-header>
        
        <main class="main-layout__main">
          <router-outlet></router-outlet>
        </main>
        
        <app-footer></app-footer>
      </div>
    </div>
  `,
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  sidebarCollapsed = false;
  
  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}