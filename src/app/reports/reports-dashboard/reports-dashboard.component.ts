import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reports-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="reports-dashboard">
      <h1>Tableau de Bord des Rapports</h1>
      
      <div class="reports-grid">
        <div class="report-card" routerLink="/reports/projects">
          <i class="fas fa-project-diagram"></i>
          <h3>Rapports de Projets</h3>
          <p>Analyse détaillée de vos projets</p>
        </div>
        
        <div class="report-card" routerLink="/reports/tasks">
          <i class="fas fa-tasks"></i>
          <h3>Rapports de Tâches</h3>
          <p>Suivi et performance des tâches</p>
        </div>
        
        <div class="report-card" routerLink="/reports/users">
          <i class="fas fa-users"></i>
          <h3>Rapports d'Utilisateurs</h3>
          <p>Performances individuelles</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reports-dashboard {
      padding: 20px;
      background-color: #f4f5f7;
    }

    .reports-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .report-card {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: transform 0.3s;
    }

    .report-card:hover {
      transform: translateY(-5px);
    }

    .report-card i {
      font-size: 3rem;
      color: #4f46e5;
      margin-bottom: 15px;
    }
  `]
})
export class ReportsDashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
