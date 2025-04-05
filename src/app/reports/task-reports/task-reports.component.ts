import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../core/services/rapport.service';
import { TacheService } from '../../core/services/tache.service';
import { Tache } from '../../core/models/tache.model';

@Component({
  selector: 'app-task-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="task-reports-container">
      <h1>Rapports de Tâches</h1>

      <div class="report-filters">
        <select [(ngModel)]="selectedStatus">
          <option value="">Tous les Statuts</option>
          <option value="A_FAIRE">À Faire</option>
          <option value="EN_COURS">En Cours</option>
          <option value="TERMINE">Terminées</option>
        </select>

        <button (click)="generateTaskReport()">
          Générer Rapport
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Statut</th>
            <th>Priorité</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Progression</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let task of filteredTasks">
            <td>{{ task.titre }}</td>
            <td>{{ getStatusLabel(task.statut) }}</td>
            <td>{{ getPriorityLabel(task.priorite) }}</td>
            <td>{{ task.dateDebut | date:'dd/MM/yyyy' }}</td>
            <td>{{ task.dateFin | date:'dd/MM/yyyy' }}</td>
            <td>{{ task.progression }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .task-reports-container {
      padding: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
  `]
})
export class TaskReportsComponent implements OnInit {
  tasks: Tache[] = [];
  selectedStatus = '';

  constructor(
    private tacheService: TacheService,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tacheService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('Erreur de chargement des tâches', error);
      }
    });
  }

  get filteredTasks(): Tache[] {
    return this.selectedStatus 
      ? this.tasks.filter(t => t.statut === this.selectedStatus)
      : this.tasks;
  }

  getStatusLabel(status: string): string {
    const statusLabels: { [key: string]: string } = {
      'A_FAIRE': 'À Faire',
      'EN_COURS': 'En Cours',
      'TERMINE': 'Terminée'
    };
    return statusLabels[status] || status;
  }

  getPriorityLabel(priority: string): string {
    const priorityLabels: { [key: string]: string } = {
      'FAIBLE': 'Faible',
      'MOYENNE': 'Moyenne',
      'ELEVEE': 'Élevée',
      'URGENTE': 'Urgente'
    };
    return priorityLabels[priority] || priority;
  }

  generateTaskReport(): void {
    const reportData = this.filteredTasks.map(task => ({
      Titre: task.titre,
      Statut: this.getStatusLabel(task.statut),
      Priorité: this.getPriorityLabel(task.priorite),
      'Date de Début': new Date(task.dateDebut).toLocaleDateString(),
      'Date de Fin': new Date(task.dateFin).toLocaleDateString(),
      Progression: `${task.progression || 0}%`
    }));
  
    this.reportService.generatePDF(
      'Rapport des Tâches',
      ['Titre', 'Statut', 'Priorité', 'Date de Début', 'Date de Fin', 'Progression'],
      reportData
    );
  }
}