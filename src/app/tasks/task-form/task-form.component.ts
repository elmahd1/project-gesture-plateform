import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Tache } from '../../core/models/tache.model';
import { Projet } from '../../core/models/projet.model';
import { Utilisateur } from '../../core/models/utilisateur.model';

import { TacheService } from '../../core/services/tache.service';
import { ProjetService } from '../../core/services/projet.service';
import { UtilisateurService } from '../../core/services/utilisateur.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
  <div class="task-form-container">
    <h1>{{ isEditMode ? 'Modifier la Tâche' : 'Créer une Nouvelle Tâche' }}</h1>
    
    <form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="titre">Titre de la Tâche</label>
        <input 
          type="text" 
          id="titre" 
          formControlName="titre" 
          [ngClass]="{'is-invalid': isFieldInvalid('titre')}"
        >
        <div 
          *ngIf="isFieldInvalid('titre')" 
          class="error-message"
        >
          {{ getErrorMessage('titre') }}
        </div>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea 
          id="description" 
          formControlName="description"
          [ngClass]="{'is-invalid': isFieldInvalid('description')}"
        ></textarea>
        <div 
          *ngIf="isFieldInvalid('description')" 
          class="error-message"
        >
          {{ getErrorMessage('description') }}
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="dateDebut">Date de Début</label>
          <input 
            type="date" 
            id="dateDebut" 
            formControlName="dateDebut"
            [ngClass]="{'is-invalid': isFieldInvalid('dateDebut')}"
          >
        </div>

        <div class="form-group">
          <label for="dateFin">Date de Fin</label>
          <input 
            type="date" 
            id="dateFin" 
            formControlName="dateFin"
            [ngClass]="{'is-invalid': isFieldInvalid('dateFin')}"
          >
        </div>
      </div>

      <div class="form-group">
        <label for="priorite">Priorité</label>
        <select 
          id="priorite" 
          formControlName="priorite"
        >
          <option value="FAIBLE">Faible</option>
          <option value="MOYENNE">Moyenne</option>
          <option value="ELEVEE">Élevée</option>
          <option value="URGENTE">Urgente</option>
        </select>
      </div>

      <div class="form-group">
        <label for="statut">Statut</label>
        <select 
          id="statut" 
          formControlName="statut"
        >
          <option value="A_FAIRE">À Faire</option>
          <option value="EN_COURS">En Cours</option>
          <option value="TERMINE">Terminée</option>
        </select>
      </div>

      <div class="form-group">
        <label for="projet">Projet</label>
        <select 
          id="projet" 
          formControlName="projet"
        >
          <option value="">Sélectionner un projet</option>
          <option 
            *ngFor="let projet of projets" 
            [value]="projet.id"
          >
            {{ projet.nom }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Assignés</label>
        <div class="assignees-list">
          <div 
            *ngFor="let utilisateur of utilisateurs" 
            class="assignee-item"
          >
            <input 
              type="checkbox" 
              [id]="'assignee-' + utilisateur.id"
              [value]="utilisateur.id"
              (change)="toggleAssignee(utilisateur.id)"
            >
            <label [for]="'assignee-' + utilisateur.id">
              {{ utilisateur.nom }} {{ utilisateur.prenom }}
            </label>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="progression">Progression (%)</label>
        <input 
          type="number" 
          id="progression" 
          formControlName="progression"
          min="0" 
          max="100"
        >
      </div>

      <div class="form-actions">
        <button 
          type="submit" 
          class="btn-primary"
        >
          {{ isEditMode ? 'Mettre à Jour' : 'Créer Tâche' }}
        </button>
        <button 
          type="button" 
          class="btn-secondary" 
          (click)="onCancel()"
        >
          Annuler
        </button>
      </div>
    </form>
  </div>
  `,
  styles: [`

    .task-form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f4f5f7;
    border-radius: 8px;
  
    h1 {
      text-align: center;
      margin-bottom: 20px;
      color: #333;
    }
  
    .form-group {
      margin-bottom: 15px;
  
      label {
        display: block;
        margin-bottom: 5px;
        color: #333;
      }
  
      input, textarea, select {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        transition: border-color 0.3s;
  
        &:focus {
          outline: none;
          border-color: #4f46e5;
        }
      }
  
      textarea {
        min-height: 100px;
      }
  
      .error-message {
        color: #dc2626;
        font-size: 0.8rem;
        margin-top: 5px;
      }
  
      .is-invalid {
        border-color: #dc2626;
      }
    }
  
    .form-row {
      display: flex;
      gap: 15px;
  
      .form-group {
        flex: 1;
      }
    }
  
    .membres-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
  
      .membre-item {
        display: flex;
        align-items: center;
        gap: 10px;
  
        input {
          width: auto;
        }
      }
    }
  
    .form-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
  
      .btn-primary, .btn-secondary {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
      }
  
      .btn-primary {
        background-color: #4f46e5;
        color: white;
  
        &:hover {
          background-color: #4338ca;
        }
      }
  

    }
  }
    .form-row {
      display: flex;
      gap: 15px;
    }

    .assignees-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .btn-primary, .btn-secondary {
      padding: 10px 15px;
      margin-right: 10px;
    }
  `]
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode = false;
  taskId: number | null = null;
  projets: Projet[] = [];
  utilisateurs: Utilisateur[] = [];

  constructor(
    private fb: FormBuilder,
    private tacheService: TacheService,
    private projetService: ProjetService,
    private utilisateurService: UtilisateurService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      priorite: ['MOYENNE', Validators.required],
      statut: ['A_FAIRE', Validators.required],
      projet: [null],
      assignes: [[]],
      progression: [0, [Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnInit(): void {
    this.loadProjets();
    this.loadUtilisateurs();
    this.checkEditMode();
  }

  loadProjets(): void {
    this.projetService.getProjects().subscribe({
      next: (projets) => {
        this.projets = projets;
      },
      error: (error) => {
        console.error('Erreur de chargement des projets', error);
      }
    });
  }

  loadUtilisateurs(): void {
    this.utilisateurService.getAllUtilisateurs().subscribe({
      next: (utilisateurs) => {
        this.utilisateurs = utilisateurs;
      },
      error: (error) => {
        console.error('Erreur de chargement des utilisateurs', error);
      }
    });
  }

  checkEditMode(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.taskId = +id;
        this.loadTaskDetails(+id);
      }
    });
  }

  loadTaskDetails(id: number): void {
    this.tacheService.getTaskById(id).subscribe({
      next: (task) => {
        this.taskForm.patchValue({
          ...task,
          // Safely handle potentially undefined projet and assignes
          projet: task.projet?.id,
          assignes: task.assignes ? task.assignes.map(a => a.id) : []
        });
      },
      error: (error) => {
        console.error('Erreur de chargement de la tâche', error);
      }
    });
  }

  toggleAssignee(userId: number | undefined): void {
    if (userId === undefined) return;
  
    const assignesControl = this.taskForm.get('assignes');
    const currentAssignees = assignesControl?.value || [];
    const index = currentAssignees.indexOf(userId);
  
    if (index > -1) {
      currentAssignees.splice(index, 1);
    } else {
      currentAssignees.push(userId);
    }
  
    assignesControl?.setValue(currentAssignees);
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.markFormGroupTouched(this.taskForm);
      return;
    }
    const taskData: Tache = {
      ...this.taskForm.value,
      id: this.taskId || 0,
      projet: this.taskForm.value.projet 
        ? { id: this.taskForm.value.projet } as Projet 
        : undefined,
      assignes: (this.taskForm.value.assignes || []).map((id: number) => ({ id } as Utilisateur))
    };

    if (this.isEditMode) {
      this.tacheService.updateTask(this.taskId!, taskData).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (error) => console.error('Erreur de mise à jour', error)
      });
    } else {
      this.tacheService.createTask(taskData).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (error) => console.error('Erreur de création', error)
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/tasks']);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.taskForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.taskForm.get(fieldName);
    if (!field) return '';

    if (field.errors?.['required']) {
      return 'Ce champ est requis';
    }
    if (field.errors?.['minlength']) {
      return `Minimum ${field.errors['minlength'].requiredLength} caractères`;
    }
    return '';
  }
}