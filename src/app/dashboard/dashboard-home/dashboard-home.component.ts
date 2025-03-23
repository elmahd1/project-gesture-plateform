import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';

import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';

import { AuthService } from '../../core/services/auth.service';
import { ProjetService } from '../../core/services/projet.service';
import { TacheService } from '../../core/services/tache.service';

import { Utilisateur } from '../../core/models/utilisateur.model';
import { Projet } from '../../core/models/projet.model';
import { Tache } from '../../core/models/tache.model';

// For charts
// import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    LoadingSpinnerComponent,
    TimeAgoPipe
    // ,
    // NgChartsModule  // Important: Add this import for chart functionality
  ],
  template: `
  <div class="dashboard-content">
    <!-- État de chargement -->
    <div *ngIf="loading" class="loading-state">
      <app-loading-spinner [overlay]="true" message="Chargement du tableau de bord..."></app-loading-spinner>
    </div>

    <ng-container *ngIf="!loading">
      <!-- Section Bienvenue -->
      <div class="welcome-section">
        <div class="welcome-info">
          <h1>Bienvenue, {{currentUser?.nom || 'Utilisateur'}} {{currentUser?.prenom || ''}}!</h1>
          <p>Voici ce qui se passe avec vos projets aujourd'hui.</p>
        </div>
        <div class="date-time">
          <div class="current-date">{{today | date:'EEEE, d MMMM yyyy'}}</div>
          <div class="current-time">{{time}}</div>
        </div>
      </div>

      <!-- Cartes de Statistiques -->
      <div class="stats-cards">
        <div class="stat-card" *ngFor="let stat of statsData" [ngStyle]="{'border-color': stat.color}">
          <div class="stat-icon" [ngStyle]="{'background-color': stat.color}">
            <i [class]="stat.icon"></i>
          </div>
          <div class="stat-info">
            <h3>{{stat.title}}</h3>
            <div class="stat-value">{{stat.value}}
              <span class="stat-change" [ngClass]="{'increase': stat.change > 0, 'decrease': stat.change < 0}" *ngIf="stat.change !== 0">
                <i class="fas" [ngClass]="stat.change > 0 ? 'fa-arrow-up' : 'fa-arrow-down'"></i>
                {{Math.abs(stat.change)}}%
              </span>
            </div>
            <p class="stat-description">{{stat.description}}</p>
          </div>
        </div>
      </div>

      <!-- Progression du Projet & Aperçu des Tâches -->
      <div class="dashboard-grid">
        <!-- Progression du Projet -->
        <div class="widget project-progress">
          <div class="widget-header">
            <h2>Progression des Projets</h2>
            <div class="widget-actions">
              <button class="icon-btn" (click)="refreshProjectData()">
                <i class="fas fa-sync-alt"></i>
              </button>
              <div class="dropdown">
                <button class="icon-btn">
                  <i class="fas fa-ellipsis-v"></i>
                </button>
                <div class="dropdown-content">
                  <a (click)="exportProjectData('pdf')">Exporter en PDF</a>
                  <a (click)="exportProjectData('csv')">Exporter en CSV</a>
                  <a (click)="exportProjectData('excel')">Exporter en Excel</a>
                </div>
              </div>
            </div>
          </div>
          <div class="widget-content">
            <div class="project-list">
              <div class="project-item" *ngFor="let project of projects">
                <div class="project-info">
                  <h3>{{project.nom || 'Projet sans nom'}}</h3>
                  <div class="project-meta">
                    <span class="project-deadline">
                      <i class="fas fa-clock"></i> Échéance 
                      {{project.dateFin | date:'d MMM'}}
                    </span>
                    <span class="project-members">
                      <i class="fas fa-users"></i> {{project.membres?.length || 0  membres
                    </span>
                  </div>
                </div>
                <div class="project-progress-bar">
                  <div class="progress-track">

                  </div>
                  <div class="progress-percentage">0%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Aperçu des Tâches -->
        <div class="widget task-overview">
          <div class="widget-header">
            <h2>Aperçu des Tâches</h2>
            <div class="widget-actions">
              <button class="icon-btn">
                <i class="fas fa-sync-alt"></i>
              </button>
              <div class="dropdown">
                <button class="icon-btn">
                  <i class="fas fa-ellipsis-v"></i>
                </button>
                <div class="dropdown-content">
                  <a>Toutes les Tâches</a>
                  <a>Dues Aujourd'hui</a>
                  <a>Dues Cette Semaine</a>
                  <a>En Retard</a>
                </div>
              </div>
            </div>
          </div>
          <div class="widget-content">
            <div class="task-summary">
              <div class="task-summary-item">
                <div class="summary-label">Total</div>
                <div class="summary-value">{{taskSummary.total}}</div>
              </div>
              <div class="task-summary-item">
                <div class="summary-label">Terminées</div>
                <div class="summary-value">{{taskSummary.completed}}</div>
              </div>
              <div class="task-summary-item">
                <div class="summary-label">En Cours</div>
                <div class="summary-value">{{taskSummary.inProgress}}</div>
              </div>
              <div class="task-summary-item">
                <div class="summary-label">En Attente</div>
                <div class="summary-value">{{taskSummary.pending}}</div>
              </div>
              <div class="task-summary-item">
                <div class="summary-label">En Retard</div>
                <div class="summary-value">{{taskSummary.overdue}}</div>
              </div>
            </div>
            <div class="task-chart">
              <!-- Simple visualization instead of chart for now -->
              <div class="chart-placeholder">
                Graphique du résumé des tâches
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chronologie d'Activité & Mes Tâches -->
      <div class="dashboard-grid">
        <!-- Chronologie d'Activité -->
        <div class="widget activity-timeline">
          <div class="widget-header">
            <h2>Activité Récente</h2>
            <div class="widget-actions">
              <button class="text-btn">
                Voir Tout
              </button>
            </div>
          </div>
          <div class="widget-content">
            <div class="timeline">
              <div class="timeline-item" *ngFor="let activity of activities">
                <div class="timeline-icon" [ngStyle]="{'background-color': activity.iconBg}">
                  <i [class]="activity.icon"></i>
                </div>
                <div class="timeline-content">
                  <div class="timeline-header">
                    <span class="timeline-title" [innerHTML]="activity.title"></span>
                    <span class="timeline-time">{{activity.time | timeAgo}}</span>
                  </div>
                  <div class="timeline-body" *ngIf="activity.description">
                    <p>{{activity.description}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mes Tâches -->
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
            <ul class="task-list">
              <li class="task-item" *ngFor="let task of myTasks" [ngClass]="{'completed': task.statut === 'TERMINE' || task.status === 'TERMINE'}">
                <div class="task-checkbox">
                  <input type="checkbox" [id]="'task-' + task.id" [checked]="task.statut === 'TERMINE' || task.status === 'TERMINE'">
                  <label [for]="'task-' + task.id"></label>
                </div>
                <div class="task-content">
                  <div class="task-header">
                  
                    <div class="task-meta">
                      <span class="task-project">

                      </span>
                    </div>
                  </div>
                  <div class="task-details">
                    <div class="task-due-date" [ngClass]="{'overdue': isOverdueTask(task)}">
                      <i class="fas fa-calendar-alt"></i> Échéance {{(task.dateFin || task.datefin) | date:'d MMM, y'}}
                    </div>
                    <div class="task-assignee" *ngIf="task.assignes?.length || task.assignee">
                      <ng-container *ngIf="task.assignes?.length; else singleAssignee">
                        <img [src]="task.assignes[0].avatar || 'assets/images/default-avatar.jpg'" 
                             [alt]="task.assignes[0].nom + ' ' + task.assignes[0].prenom">
                        <span>{{task.assignes[0].nom}} {{task.assignes[0].prenom}}</span>
                      </ng-container>
                      <ng-template #singleAssignee>
                        <img [src]="task.assignee?.avatar || 'assets/images/default-avatar.jpg'" 
                             [alt]="task.assignee?.nom + ' ' + task.assignee?.prenom">
                        <span>{{task.assignee?.nom}} {{task.assignee?.prenom}}</span>
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
            <div class="no-tasks" *ngIf="myTasks.length === 0">
              <i class="fas fa-clipboard-check"></i>
              <p>Vous n'avez pas encore de tâches assignées.</p>
              <button class="secondary-btn" routerLink="/tasks/create">Créer une Nouvelle Tâche</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Graphiques de Performance -->
      <div class="widget performance-charts">
        <div class="widget-header">
          <h2>Analytique de Performance</h2>
          <div class="widget-actions">
            <div class="filter-btns">
              <button class="text-btn" [ngClass]="{'active': currentChartPeriod === 'week'}" >Semaine</button>
              <button class="text-btn" [ngClass]="{'active': currentChartPeriod === 'month'}" >Mois</button>
              <button class="text-btn" [ngClass]="{'active': currentChartPeriod === 'quarter'}" >Trimestre</button>
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
            <!-- Simple visualization instead of chart for now -->
            <div class="chart-placeholder">
              Graphique de performance
            </div>
          </div>
        </div>
      </div>

      <!-- Performance d'Équipe -->
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
                  <div class="progress-fill" [ngStyle]="{'width': member.efficiency + '%', 'background-color': getProgressColor(member.efficiency)}"></div>
                </div>
                <div class="progress-percentage">{{member.efficiency}}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
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