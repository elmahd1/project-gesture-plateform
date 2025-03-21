import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="forgot-password-container">
      <div class="forgot-password-card">
        <div class="forgot-password-header">
          <div class="logo">
            <div class="logo-icon">W</div>
            <h1>Workflow</h1>
          </div>
          <h2>Réinitialisation du mot de passe</h2>
          <p>Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>
        </div>
        
        <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()" class="forgot-password-form">
          <div class="form-group" [ngClass]="{'error': submitted && f['email'].errors}">
            <label for="email">Email</label>
            <div class="input-with-icon">
              <i class="fas fa-envelope"></i>
              <input 
                type="email" 
                id="email" 
                formControlName="email" 
                placeholder="Entrez votre email" 
                [ngClass]="{'is-invalid': submitted && f['email'].errors}"
              >
            </div>
            <div *ngIf="submitted && f['email'].errors" class="error-message">
              <span *ngIf="f['email'].errors['required']">L'email est requis</span>
              <span *ngIf="f['email'].errors['email']">L'email doit être une adresse valide</span>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="submit-btn" [disabled]="loading">
              <span *ngIf="!loading">Envoyer le lien</span>
              <span *ngIf="loading" class="spinner">
                <i class="fas fa-spinner fa-spin"></i>
              </span>
            </button>
          </div>
          
          <div class="success-alert" *ngIf="success">
            Un lien de réinitialisation a été envoyé à votre adresse email.
          </div>
          
          <div class="error-alert" *ngIf="error">
            {{error}}
          </div>
        </form>
        
        <div class="back-to-login">
          <p><a routerLink="/login">Retour à la connexion</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .forgot-password-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }

    .forgot-password-card {
      background-color: var(--white);
      border-radius: 12px;
      box-shadow: var(--shadow-lg);
      width: 100%;
      max-width: 450px;
      padding: 40px;
    }

    .forgot-password-header {
      text-align: center;
      margin-bottom: 30px;
      
      .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        
        .logo-icon {
          height: 50px;
          width: 50px;
          background-color: var(--primary-color);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          font-weight: 700;
          font-size: 1.8rem;
          margin-right: 15px;
        }
        
        h1 {
          font-size: 1.8rem;
          margin: 0;
          background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      
      h2 {
        font-size: 1.5rem;
        margin: 0 0 15px;
      }
      
      p {
        color: var(--gray-500);
        margin: 0;
      }
    }

    .forgot-password-form {
      .form-group {
        margin-bottom: 20px;
        
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: var(--gray-700);
        }
        
        .input-with-icon {
          position: relative;
          
          i {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--gray-400);
          }
          
          input {
            width: 100%;
            padding: 12px 40px 12px 40px;
            border: 1px solid var(--gray-300);
            border-radius: 8px;
            font-size: 0.95rem;
            transition: var(--transition);
            
            &:focus {
              outline: none;
              border-color: var(--primary-color);
              box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
            }
            
            &.is-invalid {
              border-color: var(--red);
            }
          }
        }
        
        .error-message {
          color: var(--red);
          font-size: 0.75rem;
          margin-top: 5px;
        }
        
        &.error {
          .input-with-icon input {
            border-color: var(--red);
          }
        }
      }
      
      .form-actions {
        margin-top: 30px;
        
        .submit-btn {
          width: 100%;
          padding: 12px 0;
          background-color: var(--primary-color);
          color: var(--white);
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: var(--transition);
          
          &:hover:not(:disabled) {
            background-color: var(--primary-dark);
          }
          
          &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
          
          .spinner {
            display: inline-block;
          }
        }
      }
      
      .success-alert {
        margin-top: 15px;
        padding: 10px;
        background-color: rgba(16, 185, 129, 0.1);
        color: var(--green);
        border-radius: 6px;
        font-size: 0.875rem;
        text-align: center;
      }
      
      .error-alert {
        margin-top: 15px;
        padding: 10px;
        background-color: rgba(239, 68, 68, 0.1);
        color: var(--red);
        border-radius: 6px;
        font-size: 0.875rem;
        text-align: center;
      }
    }
    
    .back-to-login {
      margin-top: 30px;
      text-align: center;
      
      p {
        color: var(--gray-600);
        margin: 0;
        
        a {
          color: var(--primary-color);
          font-weight: 500;
          
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    @media (max-width: 576px) {
      .forgot-password-card {
        padding: 30px 20px;
      }
    }
  `]
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  loading = false;
  submitted = false;
  success = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Getter pour faciliter l'accès aux champs du formulaire
  get f() { return this.forgotPasswordForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.success = false;
    this.error = '';

    // S'arrêter ici si le formulaire est invalide
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.forgotPassword(this.f['email'].value)
      .subscribe({
        next: () => {
          this.success = true;
          this.loading = false;
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }
}
