import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="reset-password-container">
      <div class="reset-password-card">
        <div class="reset-password-header">
          <div class="logo">
            <div class="logo-icon">W</div>
            <h1>Workflow</h1>
          </div>
          <h2>Réinitialiser votre mot de passe</h2>
          <p>Entrez votre nouveau mot de passe ci-dessous.</p>
        </div>
        
        <form [formGroup]="resetPasswordForm" (ngSubmit)="onSubmit()" class="reset-password-form">
          <div class="form-group" [ngClass]="{'error': submitted && f['password'].errors}">
            <label for="password">Nouveau mot de passe</label>
            <div class="input-with-icon">
              <i class="fas fa-lock"></i>
              <input 
                [type]="showPassword ? 'text' : 'password'" 
                id="password" 
                formControlName="password" 
                placeholder="Entrez votre nouveau mot de passe" 
                [ngClass]="{'is-invalid': submitted && f['password'].errors}"
              >
              <button 
                type="button" 
                class="toggle-password" 
                (click)="togglePasswordVisibility()"
              >
                <i class="fas" [ngClass]="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
              </button>
            </div>
            <div *ngIf="submitted && f['password'].errors" class="error-message">
              <span *ngIf="f['password'].errors['required']">Le mot de passe est requis</span>
              <span *ngIf="f['password'].errors['minlength']">Le mot de passe doit contenir au moins 6 caractères</span>
            </div>
          </div>
          
          <div class="form-group" [ngClass]="{'error': submitted && f['confirmPassword'].errors}">
            <label for="confirmPassword">Confirmer le mot de passe</label>
            <div class="input-with-icon">
              <i class="fas fa-lock"></i>
              <input 
                [type]="showConfirmPassword ? 'text' : 'password'" 
                id="confirmPassword" 
                formControlName="confirmPassword" 
                placeholder="Confirmez votre mot de passe" 
                [ngClass]="{'is-invalid': submitted && f['confirmPassword'].errors}"
              >
              <button 
                type="button" 
                class="toggle-password" 
                (click)="toggleConfirmPasswordVisibility()"
              >
                <i class="fas" [ngClass]="showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
              </button>
            </div>
            <div *ngIf="submitted && f['confirmPassword'].errors" class="error-message">
              <span *ngIf="f['confirmPassword'].errors['required']">La confirmation du mot de passe est requise</span>
              <span *ngIf="f['confirmPassword'].errors['matchPassword']">Les mots de passe ne correspondent pas</span>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="submit-btn" [disabled]="loading">
              <span *ngIf="!loading">Réinitialiser le mot de passe</span>
              <span *ngIf="loading" class="spinner">
                <i class="fas fa-spinner fa-spin"></i>
              </span>
            </button>
          </div>
          
          <div class="success-alert" *ngIf="success">
            Votre mot de passe a été réinitialisé avec succès. <a routerLink="/login">Se connecter</a>
          </div>
          
          <div class="error-alert" *ngIf="error">
            {{error}}
          </div>
        </form>
        
        <div class="back-to-login" *ngIf="!success">
          <p><a routerLink="/login">Retour à la connexion</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reset-password-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }

    .reset-password-card {
      background-color: var(--white);
      border-radius: 12px;
      box-shadow: var(--shadow-lg);
      width: 100%;
      max-width: 450px;
      padding: 40px;
    }

    .reset-password-header {
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

    .reset-password-form {
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
          
          .toggle-password {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            background: transparent;
            border: none;
            color: var(--gray-400);
            cursor: pointer;
            
            &:hover {
              color: var(--gray-600);
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
        
        a {
          color: var(--primary-color);
          font-weight: 500;
          
          &:hover {
            text-decoration: underline;
          }
        }
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
      .reset-password-card {
        padding: 30px 20px;
      }
    }
  `]
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  loading = false;
  submitted = false;
  success = false;
  error = '';
  token = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'] || '';
    
    if (!this.token) {
      this.error = 'Token de réinitialisation invalide ou expiré.';
    }
    
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Getter pour faciliter l'accès aux champs du formulaire
  get f() { return this.resetPasswordForm.controls; }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ matchPassword: true });
    } else {
      // S'il n'y a pas d'autres erreurs, supprimer l'erreur matchPassword
      const confirmErrors = form.get('confirmPassword')?.errors;
      if (confirmErrors && !confirmErrors['required']) {
        form.get('confirmPassword')?.setErrors(null);
      }
    }
    
    return null;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';

    // S'arrêter ici si le formulaire est invalide ou si le token est manquant
    if (this.resetPasswordForm.invalid || !this.token) {
      return;
    }

    this.loading = true;
    this.authService.resetPassword(this.token, this.f['password'].value)
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

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}