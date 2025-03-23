import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Tache } from '../../core/models/tache.model';
import { TacheService } from '../../core/services/tache.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
  <div class="tasks-list-container">
    <div class="tasks-header">
      <h1>Mes Tâches</h1>
      <div class="tasks-actions">
        <button 
          class="btn btn-primary" 
          routerLink="/tasks/new"
        >
          <i class="fas fa-plus"></i> Nouvelle Tâche
        </button>
      </div>
    </div>

    <div class="tasks-filters">
      <select (change)="filterTasks($event)">
        <option value="all">Toutes les Tâches</option>
        <option value="A_FAIRE">À Faire</option>
        <option value="EN_COURS">En Cours</option>
        <option value="TERMINE">Terminées</option>
      </select>
    </div>

    <div class="tasks-grid">
      <div 
        *ngFor="let task of filteredTasks" 
        class="task-card"
        [ngClass]="getTaskStatusClass(task.statut)"
      >
        <div class="task-header">
          <h3>{{ task.titre }}</h3>
          <span class="task-status">
            {{ getTaskStatusLabel(task.statut) }}
          </span>
        </div>

        <div class="task-body">
          <p>{{ task.description }}</p>

          <div class="task-meta">
            <div class="task-project" *ngIf="task.projet">
              <i class="fas fa-project-diagram"></i> 
              {{ task.projet.nom }}
            </div>

            <div class="task-priority">
              <i class="fas fa-exclamation-circle"></i> 
              {{ getTaskPriorityLabel(task.priorite) }}
            </div>
          </div>

          <div class="task-dates">
            <div class="task-start-date">
              <i class="fas fa-calendar-alt"></i> 
              Début: {{ task.dateDebut | date:'dd MMM yyyy' }}
            </div>
            <div class="task-end-date">
              <i class="fas fa-calendar-check"></i> 
              Fin: {{ task.dateFin | date:'dd MMM yyyy' }}
            </div>
          </div>

          <div class="task-progress">
            <div class="progress-track">
              <div 
                class="progress-fill" 
                [ngStyle]="{
                  'width': task.progression + '%', 
                  'background-color': getProgressColor(task.progression)
                }"
              ></div>
            </div>
            <div class="progress-percentage">
              {{ task.progression }}%
            </div>
          </div>

          <div class="task-assignees" *ngIf="task.assignes && task.assignes.length">
            <div class="assignee-avatars">
              <img 
                *ngFor="let assignee of task.assignes.slice(0,3)" 
                [src]="assignee.avatar || 'assets/images/default-avatar.jpg'"
                [alt]="assignee.nom + ' ' + assignee.prenom"
              />
              <span *ngIf="task.assignes.length > 3" class="more-assignees">
                +{{ task.assignes.length - 3 }}
              </span>
            </div>
          </div>
        </div>

        <div class="task-actions">
          <button 
            class="btn btn-secondary" 
            [routerLink]="['/tasks', task.id]"
          >
            Détails
          </button>
          <button 
            class="btn btn-primary" 
            [routerLink]="['/tasks', task.id, 'edit']"
          >
            Modifier
          </button>
        </div>
      </div>
    </div>

    <div *ngIf="filteredTasks.length === 0" class="no-tasks">
      Aucune tâche trouvée
    </div>
  </div>
  `,
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  tasks: Tache[] = [];
  filteredTasks: Tache[] = [];

  constructor(private tacheService: TacheService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tacheService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.filteredTasks = tasks;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des tâches', error);
      }
    });
  }

  filterTasks(event: Event): void {
    const status = (event.target as HTMLSelectElement).value;
    
    if (status === 'all') {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter(
        task => task.statut === status
      );
    }
  }

  getTaskStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'A_FAIRE': 'status-pending',
      'EN_COURS': 'status-in-progress',
      'TERMINE': 'status-completed'
    };
    return statusClasses[status] || '';
  }

  getTaskStatusLabel(status: string): string {
    const statusLabels: { [key: string]: string } = {
      'A_FAIRE': 'À Faire',
      'EN_COURS': 'En Cours',
      'TERMINE': 'Terminée'
    };
    return statusLabels[status] || status;
  }

  getTaskPriorityLabel(priority: string): string {
    const priorityLabels: { [key: string]: string } = {
      'FAIBLE': 'Faible',
      'MOYENNE': 'Moyenne',
      'ELEVEE': 'Élevée',
      'URGENTE': 'Urgente'
    };
    return priorityLabels[priority] || priority;
  }

  getProgressColor(progress: number): string {
    if (progress < 30) return '#ef4444'; // rouge
    if (progress < 70) return '#f59e0b'; // jaune
    return '#10b981'; // vert
  }
}