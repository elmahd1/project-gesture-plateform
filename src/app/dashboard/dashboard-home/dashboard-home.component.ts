import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';

import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';

import { AuthService } from '../../core/services/auth.service';
import { ProjectService } from '../../core/services/project.service';
import { TaskService } from '../../core/services/task.service';

import { User } from '../../core/models/user.model';
import { Project } from '../../core/models/project.model';
import { Task } from '../../core/models/task.model';

// Pour les graphiques (si vous ajoutez Chart.js)
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
    
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  // Date et heure
  today = new Date();
  time = '';
  timeSubscription!: Subscription;
  
  // Données utilisateur
  currentUser: User | null = null;
  
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
  projects: Project[] = [];
  
  // Données de tâche
  myTasks: Task[] = [];
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
    private projectService: ProjectService,
    private taskService: TaskService
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
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects.slice(0, 4); // Limiter à 4 projets pour le dashboard
      
      // Charger les tâches
      this.taskService.getTasks().subscribe(tasks => {
        // Tâches assignées à l'utilisateur actuel
        if (this.currentUser) {
          this.myTasks = tasks.filter(task => 
            task.assignee && task.assignee.id === this.currentUser?.id
          ).slice(0, 5); // Limiter à 5 tâches
        }
        
        // Calculer le résumé des tâches
        this.calculateTaskSummary(tasks);
        
        // Simuler un délai de chargement pour l'UX
        setTimeout(() => {
          this.loading = false;
        }, 800);
      });
    });
  }
  
  calculateTaskSummary(tasks: Task[]): void {
    this.taskSummary.total = tasks.length;
    this.taskSummary.completed = tasks.filter(t => t.status === 'completed').length;
    this.taskSummary.inProgress = tasks.filter(t => t.status === 'in_progress').length;
    this.taskSummary.pending = tasks.filter(t => t.status === 'pending').length;
    this.taskSummary.overdue = tasks.filter(t => 
      t.status !== 'completed' && this.isOverdue(t.dueDate)
    ).length;
    
    // Mettre à jour les données du graphique
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
  
  isOverdue(date: Date): boolean {
    return new Date(date) < new Date() && new Date(date).toDateString() !== new Date().toDateString();
  }
  
  // Actions sur les projets
  refreshProjectData(): void {
    this.loadDashboardData();
  }
  
  exportProjectData(format: string): void {
    console.log(`Exporting project data as ${format}...`);
    // Implémenter la fonctionnalité d'exportation
  }
  
  // Actions sur les tâches
  refreshTaskData(): void {
    this.loadDashboardData();
  }
  
  filterTasks(filter: string): void {
    console.log(`Filtering tasks by: ${filter}`);
    // Implémenter la fonctionnalité de filtrage
  }
  
  updateTaskStatus(task: Task): void {
    task.status = task.status === 'completed' ? 'pending' : 'completed';
    // Mettre à jour le backend
    this.taskService.updateTask(task.id, { status: task.status }).subscribe(() => {
      this.loadDashboardData(); // Recharger les données pour actualiser les compteurs et graphiques
    });
  }
  
  editTask(task: Task): void {
    console.log(`Editing task ${task.id}`);
    // Rediriger vers la page d'édition de tâche
    // this.router.navigate(['/tasks', task.id, 'edit']);
  }
  
  viewTaskDetails(task: Task): void {
    console.log(`Viewing task ${task.id}`);
    // Rediriger vers la page de détail de tâche
    // this.router.navigate(['/tasks', task.id]);
  }
  
  assignTask(task: Task): void {
    console.log(`Assigning task ${task.id}`);
    // Implémenter la fonctionnalité d'assignation
  }
  
  deleteTask(task: Task): void {
    console.log(`Deleting task ${task.id}`);
    // Implémenter la fonctionnalité de suppression
  }
  
  // Actions sur les activités
  loadMoreActivities(): void {
    console.log('Loading more activities...');
    // Implémenter la fonctionnalité de chargement d'activités supplémentaires
  }
  
  // Actions sur les graphiques
  changeChartPeriod(period: string): void {
    this.currentChartPeriod = period;
    
    // Mettre à jour les données du graphique en fonction de la période sélectionnée
    console.log(`Changing chart period to ${period}...`);
    
    if (period === 'week') {
      this.performanceChartData.labels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
      // Mettre à jour les datasets en conséquence
    } else if (period === 'month') {
      this.performanceChartData.labels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
      // Mettre à jour les datasets en conséquence
    }
    // Similaire pour 'quarter' et 'year'
  }
  
  exportChartData(format: string): void {
    console.log(`Exporting chart data as ${format}...`);
    // Implémenter la fonctionnalité d'exportation
  }
  
  printChart(): void {
    console.log('Printing chart...');
    // Implémenter la fonctionnalité d'impression
  }
}
