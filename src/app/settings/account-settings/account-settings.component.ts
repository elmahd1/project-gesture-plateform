import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="account-settings-container">
      <h1>Paramètres du Compte</h1>

      <div class="settings-section profile-section">
        <h2>Informations Personnelles</h2>
        <form [formGroup]="profileForm" (ngSubmit)="updateProfile()">
          <div class="form-row">
            <div class="form-group">
              <label for="nom">Nom</label>
              <input 
                type="text" 
                id="nom" 
                formControlName="nom"
                placeholder="Votre nom"
              >
            </div>
            <div class="form-group">
              <label for="prenom">Prénom</label>
              <input 
                type="text" 
                id="prenom" 
                formControlName="prenom"
                placeholder="Votre prénom"
              >
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email"
              placeholder="Votre email"
            >
          </div>

          <div class="form-group">
            <label for="phone">Numéro de Téléphone</label>
            <input 
              type="tel" 
              id="phone" 
              formControlName="phone"
              placeholder="Votre numéro de téléphone"
            >
          </div>

          <button type="submit" [disabled]="profileForm.invalid">
            Mettre à jour le profil
          </button>
        </form>
      </div>

      <div class="settings-section security-section">
        <h2>Sécurité</h2>
        <form [formGroup]="securityForm" (ngSubmit)="updateSecurity()">
          <div class="form-group">
            <label for="currentPassword">Mot de passe actuel</label>
            <div class="password-wrapper">
              <input 
                [type]="showCurrentPassword ? 'text' : 'password'" 
                id="currentPassword" 
                formControlName="currentPassword"
                placeholder="Mot de passe actuel"
              >
              <button 
                type="button" 
                class="toggle-password"
                (click)="togglePasswordVisibility('current')"
              >
                <i class="fas" [ngClass]="showCurrentPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="newPassword">Nouveau mot de passe</label>
            <div class="password-wrapper">
              <input 
                [type]="showNewPassword ? 'text' : 'password'" 
                id="newPassword" 
                formControlName="newPassword"
                placeholder="Nouveau mot de passe"
              >
              <button 
                type="button" 
                class="toggle-password"
                (click)="togglePasswordVisibility('new')"
              >
                <i class="fas" [ngClass]="showNewPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirmer le nouveau mot de passe</label>
            <input 
              type="password" 
              id="confirmPassword" 
              formControlName="confirmPassword"
              placeholder="Confirmer le mot de passe"
            >
          </div>

          <button type="submit" [disabled]="securityForm.invalid">
            Changer le mot de passe
          </button>
        </form>
      </div>

      <div class="settings-section danger-section">
        <h2>Zone Dangereuse</h2>
        <div class="danger-actions">
          <div class="action-item">
            <div class="action-info">
              <h3>Désactiver le compte</h3>
              <p>Votre compte sera temporairement désactivé</p>
            </div>
            <button class="btn-danger" (click)="deactivateAccount()">
              Désactiver
            </button>
          </div>
          <div class="action-item">
            <div class="action-info">
              <h3>Supprimer le compte</h3>
              <p>Cette action est irréversible</p>
            </div>
            <button class="btn-critical" (click)="deleteAccount()">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .account-settings-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f5f7;
    }

    .settings-section {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);

      h2 {
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
        margin-bottom: 20px;
      }
    }

    .form-row {
      display: flex;
      gap: 15px;

      .form-group {
        flex: 1;
      }
    }

    .form-group {
      margin-bottom: 15px;

      label {
        display: block;
        margin-bottom: 5px;
        color: #333;
      }

      input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      .password-wrapper {
        position: relative;

        .toggle-password {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #888;
          cursor: pointer;
        }
      }
    }

    button {
      padding: 10px 15px;
      background-color: #4f46e5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:disabled {
        background-color: #a5b4fc;
        cursor: not-allowed;
      }
    }

    .danger-section {
      .danger-actions {
        display: flex;
        flex-direction: column;
        gap: 15px;

        .action-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #eee;
          padding: 15px;
          border-radius: 8px;

          .action-info {
            h3 {
              margin: 0 0 5px 0;
              color: #333;
            }
            p {
              margin: 0;
              color: #666;
              font-size: 0.9rem;
            }
          }

          .btn-danger {
            background-color: #f59e0b;
          }

          .btn-critical {
            background-color: #ef4444;
          }
        }
      }
    }
  `]
})
export class AccountSettingsComponent implements OnInit {
  profileForm: FormGroup;
  securityForm: FormGroup;
  showCurrentPassword = false;
  showNewPassword = false;

  constructor(private fb: FormBuilder) {
    // Profile Form
    this.profileForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });

    // Security Form
    this.securityForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Load current user data
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    // Simulated data loading
    this.profileForm.patchValue({
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      phone: '+33 6 12 34 56 78'
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');

    if (newPassword?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }

    return null;
  }

  togglePasswordVisibility(type: 'current' | 'new'): void {
    if (type === 'current') {
      this.showCurrentPassword = !this.showCurrentPassword;
    } else {
      this.showNewPassword = !this.showNewPassword;
    }
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      console.log('Profile Updated', this.profileForm.value);
      // Implement actual update logic
    }
  }

  updateSecurity(): void {
    if (this.securityForm.valid) {
      console.log('Security Updated', this.securityForm.value);
      // Implement actual password change logic
    }
  }

  deactivateAccount(): void {
    const confirmed = confirm('Êtes-vous sûr de vouloir désactiver votre compte ?');
    if (confirmed) {
      console.log('Account Deactivated');
      // Implement account deactivation logic
    }
  }

  deleteAccount(): void {
    const confirmed = confirm('ATTENTION : Voulez-vous vraiment supprimer définitivement votre compte ?');
    if (confirmed) {
      console.log('Account Deleted');
      // Implement account deletion logic
    }
  }
}