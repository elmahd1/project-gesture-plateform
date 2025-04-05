import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';

import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
// Remove TimeAgoPipe import if not used
// import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';

import { AuthService } from '../../core/services/auth.service';
import { ProjetService } from '../../core/services/projet.service';
import { TacheService } from '../../core/services/tache.service';

import { Utilisateur } from '../../core/models/utilisateur.model';
import { Projet } from '../../core/models/projet.model';
import { Tache } from '../../core/models/tache.model';

import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    LoadingSpinnerComponent
    // Remove TimeAgoPipe if not used
    // TimeAgoPipe
  ],
  template: `
<div class="dashboard-content">
  <ng-container *ngIf="loading">
    <app-loading-spinner [overlay]="true" message="Chargement du tableau de bord..."></app-loading-spinner>
  </ng-container>

  <div *ngIf="!loading" class="dashboard-wrapper">
    <!-- My Tasks Section with Safe Accessing -->
    <div class="widget my-tasks">
      <div class="widget-header">
        <h2>Mes Tâches</h2>
        <div class="widget-actions">
          <button class="primary-btn sm" routerLink="/tasks/create">
            <i class="fas fa-plus"></i> Ajouter Tâche
          </button>
        </div>
      </div>
      <div class="widget-content">
        <ng-container *ngIf="myTasks.length > 0; else noTasks">
          <ul class="task-list">
            <li class="task-item" *ngFor="let task of myTasks" 
                [ngClass]="{'completed': task.statut === 'TERMINE' || task.status === 'TERMINE'}">
              <div class="task-checkbox">
                <input type="checkbox" [id]="'task-' + task.id" 
                       [checked]="task.statut === 'TERMINE' || task.status === 'TERMINE'">
                <label [for]="'task-' + task.id"></label>
              </div>
              <div class="task-content">
                <div class="task-details">
                  <div class="task-due-date" [ngClass]="{'overdue': isOverdueTask(task)}">
                    <i class="fas fa-calendar-alt"></i> 
                    Échéance {{(task.dateFin || task.datefin) | date:'d MMM, y'}}
                  </div>
                  <div class="task-assignee">
                    <ng-container *ngIf="getFirstAssignee(task) as assignee; else noAssignee">
                      <img [src]="assignee.avatar || 'assets/images/default-avatar.jpg'" 
                           [alt]="assignee.nom + ' ' + (assignee.prenom || '')">
                      <span>{{assignee.nom || ''}} {{assignee.prenom || ''}}</span>
                    </ng-container>
                    <ng-template #noAssignee>
                      <span>Aucun assigné</span>
                    </ng-template>
                  </div>
                </div>
              </div>
              <div class="task-actions">
                <button class="icon-btn">
                  <i class="fas fa-edit"></i>
                </button>
                <div class="dropdown">
                  <button class="icon-btn">
                    <i class="fas fa-ellipsis-v"></i>
                  </button>
                  <div class="dropdown-content">
                    <a>Voir Détails</a>
                    <a>Réassigner</a>
                    <a>Supprimer</a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </ng-container>
        <ng-template #noTasks>
          <div class="no-tasks">
            <i class="fas fa-clipboard-check"></i>
            <p>Vous n'avez pas encore de tâches assignées.</p>
            <button class="secondary-btn" routerLink="/tasks/create">
              Créer une Nouvelle Tâche
            </button>
          </div>
        </ng-template>
      </div>
    </div>

    <!-- Performance Charts -->
    <div class="widget performance-charts">
      <div class="widget-header">
        <h2>Analytique de Performance</h2>
        <div class="widget-actions">
          <div class="filter-btns">
            <button class="text-btn" [ngClass]="{'active': currentChartPeriod === 'week'}">Semaine</button>
            <button class="text-btn" [ngClass]="{'active': currentChartPeriod === 'month'}">Mois</button>
            <button class="text-btn" [ngClass]="{'active': currentChartPeriod === 'quarter'}">Trimestre</button>
            <button class="text-btn" [ngClass]="{'active': currentChartPeriod === 'year'}">Année</button>
          </div>
          <div class="dropdown">
            <button class="icon-btn">
              <i class="fas fa-ellipsis-v"></i>
            </button>
            <div class="dropdown-content">
              <a>Exporter en PDF</a>
              <a>Exporter en Image</a>
              <a>Imprimer</a>
            </div>
          </div>
        </div>
      </div>
      <div class="widget-content">
        <div class="chart-container">
          <div class="chart-placeholder">
            Graphique de performance
          </div>
        </div>
      </div>
    </div>

    <!-- Team Performance -->
    <div class="widget team-performance">
      <div class="widget-header">
        <h2>Performance d'Équipe</h2>
        <div class="widget-actions">
          <button class="text-btn" routerLink="/team">
            Voir Tous les Membres
          </button>
        </div>
      </div>
      <div class="widget-content">
        <div class="team-members">
          <div class="team-member" *ngFor="let member of teamMembers">
            <div class="member-avatar">
              <span class="status-indicator" [ngClass]="member.status"></span>
            </div>
            <div class="member-info">
              <h3>{{member.name}}</h3>
              <p>{{member.role}}</p>
            </div>
            <div class="member-stats">
              <div class="member-stat">
                <span class="stat-label">Tâches</span>
                <span class="stat-value">{{member.tasks}}</span>
              </div>
              <div class="member-stat">
                <span class="stat-label">Terminées</span>
                <span class="stat-value">{{member.completed}}</span>
              </div>
            </div>
            <div class="member-progress">
              <div class="progress-track">
                <div class="progress-fill" 
                     [ngStyle]="{'width': member.efficiency + '%', 'background-color': getProgressColor(member.efficiency)}">
                </div>
              </div>
              <div class="progress-percentage">{{member.efficiency}}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  // Date et heure
  today = new Date();
  time = '';
  timeSubscription!: Subscription;
  
  // Données utilisateur
  currentUser: Utilisateur | null = null;
  
  // État de chargement
  loading = true;
  
  // Données du tableau de bord
  statsData = [
    {
      title: 'Projets Totaux',
      value: 24,
      change: 8.5,
      description: 'vs. mois précédent',
      icon: 'fas fa-project-diagram',
      color: '#4f46e5'
    },
    {
      title: 'Tâches Terminées',
      value: 145,
      change: 12.3,
      description: 'vs. mois précédent',
      icon: 'fas fa-check-circle',
      color: '#10b981'
    },
    {
      title: 'Membres d\'Équipe',
      value: 18,
      change: 2.8,
      description: 'vs. mois précédent',
      icon: 'fas fa-users',
      color: '#f59e0b'
    },
    {
      title: 'Heures Suivies',
      value: '283h 24m',
      change: -4.6,
      description: 'vs. mois précédent',
      icon: 'fas fa-clock',
      color: '#ec4899'
    }
  ];
  
  // Données de projet
  projects: Projet[] = [];
  
  // Données de tâche
  myTasks: Tache[] = [];
  taskSummary = {
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
    overdue: 0
  };
  
  // Données d'activité
  activities = [
    {
      id: 1,
      title: '<strong>Vous</strong> avez terminé la tâche <strong>Mettre à jour la documentation utilisateur</strong>',
      type: 'task_completed',
      time: new Date(new Date().getTime() - 25 * 60000), // 25 minutes ago
      icon: 'fas fa-check-circle',
      iconBg: '#10b981'
    },
    {
      id: 2,
      title: '<strong>Alex Johnson</strong> a commenté sur <strong>Refonte du Site Web</strong>',
      description: 'Je pense que nous devrions ajuster le schéma de couleurs pour mieux correspondre à notre marque.',
      type: 'comment',
      time: new Date(new Date().getTime() - 2 * 3600000), // 2 hours ago
      icon: 'fas fa-comment',
      iconBg: '#4f46e5'
    },
    {
      id: 3,
      title: '<strong>Sarah Williams</strong> vous a assigné une tâche <strong>Réviser la stratégie de contenu</strong>',
      type: 'task_assigned',
      time: new Date(new Date().getTime() - 5 * 3600000), // 5 hours ago
      icon: 'fas fa-tasks',
      iconBg: '#f59e0b'
    },
    {
      id: 4,
      title: 'Le statut du projet <strong>Campagne Marketing</strong> a changé à <strong>90% terminé</strong>',
      type: 'project_update',
      time: new Date(new Date().getTime() - 8 * 3600000), // 8 hours ago
      icon: 'fas fa-project-diagram',
      iconBg: '#ec4899'
    },
    {
      id: 5,
      title: '<strong>Nouveau membre d\'équipe</strong> Michael Chen a rejoint <strong>Développement d\'application mobile</strong>',
      type: 'team_update',
      time: new Date(new Date().getTime() - 24 * 3600000), // 1 day ago
      icon: 'fas fa-user-plus',
      iconBg: '#8b5cf6'
    }
  ];
  
  // Données du graphique de tâches
  taskChartData: ChartData = {
    labels: ['Terminées', 'En Cours', 'En Attente', 'En Retard'],
    datasets: [
      {
        data: [127, 43, 16, 8],
        backgroundColor: ['#10b981', '#4f46e5', '#f59e0b', '#ef4444'],
        hoverBackgroundColor: ['#059669', '#4338ca', '#d97706', '#dc2626'],
        borderWidth: 0
      }
    ]
  };
  
  taskChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return context.label + ': ' + context.raw + ' tâches';
          }
        }
      }
    }
  };
  
  // Données du graphique de performance
  currentChartPeriod = 'month';
  
  performanceChartData: ChartConfiguration['data'] = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        label: 'Tâches Terminées',
        data: [65, 72, 81, 78, 85, 90, 95, 110, 115, 112, 124, 145],
        fill: false,
        borderColor: '#4f46e5',
        tension: 0.4,
        borderWidth: 3
      },
      {
        label: 'Projets Livrés',
        data: [5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 12],
        fill: false,
        borderColor: '#10b981',
        tension: 0.4,
        borderWidth: 3
      },
      {
        label: 'Efficacité d\'Équipe (%)',
        data: [78, 80, 82, 79, 85, 83, 88, 87, 90, 92, 94, 96],
        fill: false,
        borderColor: '#f59e0b',
        tension: 0.4,
        borderWidth: 3
      }
    ]
  };
  
  performanceChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      }
    }
  };
  
  // Membres d'équipe
  teamMembers = [
    {
      id: 2,
      name: 'Sarah Williams',
      email: 'sarah.w@example.com',
      role: 'Stratège de Contenu',
      avatar: 'assets/images/user2-avatar.jpg',
      status: 'online',
      tasks: 28,
      completed: 25,
      efficiency: 92
    },
    {
      id: 3,
      name: 'Alex Johnson',
      email: 'alex.j@example.com',
      role: 'Designer UI/UX',
      avatar: 'assets/images/user3-avatar.jpg',
      status: 'away',
      tasks: 42,
      completed: 36,
      efficiency: 85
    },
    {
      id: 4,
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      role: 'Développeur Mobile',
      avatar: 'assets/images/user4-avatar.jpg',
      status: 'busy',
      tasks: 35,
      completed: 33,
      efficiency: 94
    },
    {
      id: 5,
      name: 'Lisa Rodriguez',
      email: 'lisa.r@example.com',
      role: 'Développeur Backend',
      avatar: 'assets/images/user5-avatar.jpg',
      status: 'offline',
      tasks: 30,
      completed: 24,
      efficiency: 80
    }
  ];
  
  // Utilitaire
  Math = Math;

  constructor(
    private authService: AuthService,
    private projectService: ProjetService,
    private taskService: TacheService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    
    this.updateTime();
    this.timeSubscription = interval(60000).subscribe(() => {
      this.updateTime();
    });
    
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }
  
  // Méthodes d'utilitaire
  updateTime(): void {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    this.time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
  getFirstAssignee(task: Tache): Utilisateur | null {
    // Prefer assignes array, fallback to assignee
    if (task.assignes && task.assignes.length > 0) {
      return task.assignes[0];
    }
    
    return task.assignee || null;
  }
  loadDashboardData(): void {
    this.loading = true;
    
    // Charger les projets
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects.slice(0, 4); // Limiter à 4 projets pour le dashboard
        
        // Charger les tâches
        this.taskService.getTasks().subscribe({
          next: (tasks) => {
            // Tâches assignées à l'utilisateur actuel
            if (this.currentUser) {
              this.myTasks = tasks.filter(task => 
                // Check both assignes array and assignee individual object
                (task.assignes && task.assignes.some(u => u.id === this.currentUser?.id)) || 
                (task.assignee && task.assignee.id === this.currentUser?.id)
              ).slice(0, 5); // Limiter à 5 tâches
            }
            
            // Calculer le résumé des tâches
            this.calculateTaskSummary(tasks);
            
            // Simuler un délai de chargement pour l'UX
            setTimeout(() => {
              this.loading = false;
            }, 800);
          },
          error: (error) => {
            console.error('Error loading tasks:', error);
            this.loading = false;
          }
        });
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.loading = false;
      }
    });
  }
  
  calculateTaskSummary(tasks: Tache[]): void {
    this.taskSummary.total = tasks.length;
    this.taskSummary.completed = tasks.filter(t => 
      t.statut === 'TERMINE' || t.status === 'TERMINE'
    ).length;
    this.taskSummary.inProgress = tasks.filter(t => 
      t.statut === 'EN_COURS' || t.status === 'EN_COURS'
    ).length;
    this.taskSummary.pending = tasks.filter(t => 
      t.statut === 'A_FAIRE' || t.status === 'A_FAIRE' || t.status === 'pending'
    ).length;
    this.taskSummary.overdue = tasks.filter(t => 
      (t.statut !== 'TERMINE' && t.status !== 'TERMINE') && this.isOverdueTask(t)
    ).length;
    
    // Update chart data
    this.taskChartData.datasets[0].data = [
      this.taskSummary.completed,
      this.taskSummary.inProgress,
      this.taskSummary.pending,
      this.taskSummary.overdue
    ];
  }
  
  getProgressColor(progress: number): string {
    if (progress < 30) return '#ef4444'; // rouge
    if (progress < 70) return '#f59e0b'; // jaune
    return '#10b981'; // vert
  }
  
  // Safe version of isOverdue that handles undefined dates
  isOverdueTask(task: Tache): boolean {
    const dueDate = task.dateFin || task.datefin;
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  }
  
  // Actions sur les projets
  refreshProjectData(): void {
    this.loadDashboardData();
  }
  
  exportProjectData(format: string): void {
    console.log(`Exporting project data as ${format}...`);
    // Implémenter la fonctionnalité d'exportation
  }
}