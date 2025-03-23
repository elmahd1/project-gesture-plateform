import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Projet } from '../../core/models/projet.model';
import { Utilisateur } from '../../core/models/utilisateur.model';
import { ProjetService } from '../../core/services/projet.service';
import { UtilisateurService } from '../../core/services/utilisateur.service';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  utilisateurs: Utilisateur[] = [];
  isEditMode = false;
  projectId: number | null = null;

  statusOptions = [
    { value: 'PLANNING', label: 'Planification' },
    { value: 'IN_PROGRESS', label: 'En Cours' },
    { value: 'ON_HOLD', label: 'En Attente' },
    { value: 'COMPLETED', label: 'Terminé' },
    { value: 'CANCELLED', label: 'Annulé' }
  ];

  constructor(
    private fb: FormBuilder,
    private projetService: ProjetService,
    private utilisateurService: UtilisateurService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projectForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      statut: ['PLANNING', Validators.required],
      membres: this.fb.control([]),
      progress: [0]
    });
  }

  ngOnInit(): void {
    this.loadUtilisateurs();
    this.checkEditMode();
  }

  loadUtilisateurs(): void {
    this.utilisateurService.getAllUtilisateurs().subscribe({
      next: (users) => {
        this.utilisateurs = users;
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
        this.projectId = +id;
        this.loadProjectDetails(+id);
      }
    });
  }

  loadProjectDetails(id: number): void {
    this.projetService.getProjectById(id).subscribe({
      next: (project) => {
        this.projectForm.patchValue({
          ...project,
          membres: project.membres.map(m => m.id)
        });
      },
      error: (error) => {
        console.error('Erreur de chargement du projet', error);
      }
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.markFormGroupTouched(this.projectForm);
      return;
    }

    const projectData: Projet = {
      ...this.projectForm.value,
      id: this.projectId || 0,
      membres: this.projectForm.value.membres.map((id: number) => ({ id } as Utilisateur)),
      taches: [],
      documents: [],
      risques: []
    };

    if (this.isEditMode) {
      this.projetService.updateProject(this.projectId!, projectData).subscribe({
        next: () => this.router.navigate(['/projects']),
        error: (error) => console.error('Erreur de mise à jour', error)
      });
    } else {
      this.projetService.createProject(projectData).subscribe({
        next: () => this.router.navigate(['/projects']),
        error: (error) => console.error('Erreur de création', error)
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/projects']);
  }

  // Helper method to mark all controls as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Method for handling member selection
  toggleMember(userId: number): void {
    const membresControl = this.projectForm.get('membres') as FormControl;
    const currentMembers = membresControl.value || [];
    const index = currentMembers.indexOf(userId);

    if (index > -1) {
      // Remove member if already exists
      currentMembers.splice(index, 1);
    } else {
      // Add member
      currentMembers.push(userId);
    }

    membresControl.setValue(currentMembers);
  }

  // Validation helper methods
  isFieldInvalid(fieldName: string): boolean {
    const field = this.projectForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.projectForm.get(fieldName);
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