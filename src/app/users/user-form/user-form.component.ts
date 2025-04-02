// src/app/users/user-form/user-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UtilisateurService } from '../../core/services/utilisateur.service';
import { Utilisateur } from '../../core/models/utilisateur.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="user-form-container">
      <div class="card">
        <div class="card-header">
          <h2>{{isEditMode ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'}}</h2>
        </div>
        <div class="card-body">
          <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="nom">Nom</label>
              <input type="text" id="nom" formControlName="nom" class="form-control" 
                     [ngClass]="{'is-invalid': submitted && f['nom'].errors}">
              <div *ngIf="submitted && f['nom'].errors" class="invalid-feedback">
                <div *ngIf="f['nom'].errors['required']">Le nom est obligatoire</div>
              </div>
            </div>

            <div class="form-group">
              <label for="prenom">Prénom</label>
              <input type="text" id="prenom" formControlName="prenom" class="form-control" 
                     [ngClass]="{'is-invalid': submitted && f['prenom'].errors}">
              <div *ngIf="submitted && f['prenom'].errors" class="invalid-feedback">
                <div *ngIf="f['prenom'].errors['required']">Le prénom est obligatoire</div>
              </div>
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" formControlName="email" class="form-control" 
                     [ngClass]="{'is-invalid': submitted && f['email'].errors}">
              <div *ngIf="submitted && f['email'].errors" class="invalid-feedback">
                <div *ngIf="f['email'].errors['required']">L'email est obligatoire</div>
                <div *ngIf="f['email'].errors['email']">Veuillez entrer un email valide</div>
              </div>
            </div>

            <div class="form-group">
              <label for="role">Rôle</label>
              <select id="role" formControlName="role" class="form-control" 
                      [ngClass]="{'is-invalid': submitted && f['role'].errors}">
                <option value="">Sélectionner un rôle</option>
                <option value="ADMIN">Administrateur</option>
                <option value="CHEF_PROJET">Chef de projet</option>
                <option value="MEMBRE">Membre</option>
              </select>
              <div *ngIf="submitted && f['role'].errors" class="invalid-feedback">
                <div *ngIf="f['role'].errors['required']">Le rôle est obligatoire</div>
              </div>
            </div>

            <div *ngIf="!isEditMode" class="form-group">
              <label for="motDePasse">Mot de passe</label>
              <input type="password" id="motDePasse" formControlName="motDePasse" class="form-control" 
                     [ngClass]="{'is-invalid': submitted && f['motDePasse'].errors}">
              <div *ngIf="submitted && f['motDePasse'].errors" class="invalid-feedback">
                <div *ngIf="f['motDePasse'].errors['required']">Le mot de passe est obligatoire</div>
                <div *ngIf="f['motDePasse'].errors['minlength']">Le mot de passe doit contenir au moins 6 caractères</div>
              </div>
            </div>

            <div class="form-group buttons">
              <button type="submit" class="btn btn-primary" [disabled]="loading">
                <span *ngIf="loading" class="spinner-border spinner-border-sm mr-1"></span>
                {{isEditMode ? 'Mettre à jour' : 'Ajouter'}}
              </button>
              <button type="button" class="btn btn-secondary" (click)="onCancel()">Annuler</button>
            </div>

            <div *ngIf="error" class="alert alert-danger mt-3">{{error}}</div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .user-form-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .card {
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      border-radius: 8px;
      overflow: hidden;
    }
    .card-header {
      background: #4f46e5;
      color: white;
      padding: 15px 20px;
    }
    .card-body {
      padding: 20px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }
    .form-control {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .form-control.is-invalid {
      border-color: #dc3545;
    }
    .invalid-feedback {
      color: #dc3545;
      font-size: 14px;
      margin-top: 5px;
    }
    .buttons {
      display: flex;
      gap: 10px;
    }
    .btn {
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }
    .btn-primary {
      background: #4f46e5;
      color: white;
    }
    .btn-primary:hover {
      background: #4338ca;
    }
    .btn-primary:disabled {
      background: #a5a5a5;
      cursor: not-allowed;
    }
    .btn-secondary {
      background: #6c757d;
      color: white;
    }
    .btn-secondary:hover {
      background: #5a6268;
    }
    .alert {
      padding: 10px 15px;
      border-radius: 4px;
    }
    .alert-danger {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
  `]
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  loading = false;
  submitted = false;
  isEditMode = false;
  userId: number | null = null;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private utilisateurService: UtilisateurService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    this.isEditMode = !!this.userId;

    // Initialize form
    this.userForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      motDePasse: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]]
    });

    // If editing, load user data
    if (this.isEditMode && this.userId) {
      this.loading = true;
      this.utilisateurService.getUtilisateurById(this.userId).subscribe({
        next: (user) => {
          this.loading = false;
          this.userForm.patchValue({
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            role: user.role
          });
          // Remove password field for edit mode
          if (this.isEditMode) {
            this.userForm.removeControl('motDePasse');
          }
        },
        error: (error) => {
          this.loading = false;
          this.error = 'Failed to load user data. ' + (error.message || '');
        }
      });
    }
  }

  // Convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const userData = { ...this.userForm.value };

    if (this.isEditMode && this.userId) {
      this.utilisateurService.updateUtilisateur(this.userId, userData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/users']);
        },
        error: (error) => {
          this.loading = false;
          this.error = 'Failed to update user. ' + (error.message || '');
        }
      });
    } else {
      this.utilisateurService.createUtilisateur(userData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/users']);
        },
        error: (error) => {
          this.loading = false;
          this.error = 'Failed to create user. ' + (error.message || '');
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}