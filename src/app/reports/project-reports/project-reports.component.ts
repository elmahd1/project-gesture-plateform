import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../core/services/rapport.service';
import { ProjetService } from '../../core/services/projet.service';
import { Projet } from '../../core/models/projet.model';

@Component({
  selector: 'app-project-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="project-reports-container">
      <h1>Rapports de Projets</h1>

      <div class="report-filters">
        <select [(ngModel)]="selectedStatus">
          <option value="">Tous les Statuts</option>
          <option value="PLANNING">Planification</option>
          <option value="IN_PROGRESS">En Cours</option>
          <option value="COMPLETED">Terminés</option>
        </select>

        <button (click)="generateProjectReport()">
          Générer Rapport
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Statut</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Progression</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let project of filteredProjects">
            <td>{{ project.nom }}</td>
            <td>{{ getStatusLabel(project.statut) }}</td>
            <td>{{ project.dateDebut | date:'dd/MM/yyyy' }}</td>
            <td>{{ project.dateFin | date:'dd/MM/yyyy' }}</td>
            <td>{{ project.progress }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .project-reports-container {
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
export class ProjectReportsComponent implements OnInit {
  projects: Projet[] = [];
  selectedStatus = '';

  constructor(
    private projetService: ProjetService,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projetService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: (error) => {
        console.error('Erreur de chargement des projets', error);
      }
    });
  }

  get filteredProjects(): Projet[] {
    return this.selectedStatus 
      ? this.projects.filter(p => p.statut === this.selectedStatus)
      : this.projects;
  }

  getStatusLabel(status: string): string {
    const statusLabels: { [key: string]: string } = {
      'PLANNING': 'Planification',
      'IN_PROGRESS': 'En Cours',
      'COMPLETED': 'Terminé'
    };
    return statusLabels[status] || status;
  }

  generateProjectReport(): void {
    const reportData = this.filteredProjects.map(project => ({
      Nom: project.nom,
      Statut: this.getStatusLabel(project.statut),
      'Date de Début': project.dateDebut.toLocaleDateString(),
      'Date de Fin': project.dateFin.toLocaleDateString(),
      Progression: `${project.progress}%`
    }));

    this.reportService.generatePDF(
      'Rapport des Projets', 
      ['Nom', 'Statut', 'Date de Début', 'Date de Fin', 'Progression'],
      reportData
    );
  }
}