import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer__content">
          <p class="footer__copyright">© {{ currentYear }} Workflow. All rights reserved.</p>
          <div class="footer__links">
            <a routerLink="/terms" class="footer__link">Terms</a>
            <a routerLink="/privacy" class="footer__link">Privacy</a>
            <a routerLink="/support" class="footer__link">Support</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      padding: 20px 0;
      background-color: #fff;
      border-top: 1px solid #eee;
      margin-top: auto;
      
      .container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
      }
      
      &__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        
        @media (max-width: 576px) {
          flex-direction: column;
          text-align: center;
        }
      }
      
      &__copyright {
        margin: 0;
        color: #666;
        font-size: 0.9rem;
        
        @media (max-width: 576px) {
          margin-bottom: 10px;
        }
      }
      
      &__links {
        display: flex;
        gap: 20px;
      }
      
      &__link {
        color: #666;
        text-decoration: none;
        font-size: 0.9rem;
        transition: color 0.2s ease;
        
        &:hover {
          color: #3f51b5;
        }
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}