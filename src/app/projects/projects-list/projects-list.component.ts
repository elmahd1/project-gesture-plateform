import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Project {
  id: number;
  name: string;
  description: string;
  status: 'PLANNING' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';
  progress: number;
  startDate: Date;
  dueDate: Date;
  owner: string;
  members: string[];
  deadline?: Date; // Added to resolve the dashboard error
}

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="projects-list">
      <div class="projects-list__header">
        <h1 class="projects-list__title">Projets</h1>
        <div class="projects-list__actions">
          <button routerLink="/projects/new" class="btn btn-primary">
            <i class="fas fa-plus"></i> Nouveau Projet
          </button>
        </div>
      </div>
      
      <div class="projects-list__filters">
        <div class="projects-list__search">
          <i class="fas fa-search projects-list__search-icon"></i>
          <input 
            type="text" 
            class="form-control" 
            placeholder="Rechercher un projet..." 
            [(ngModel)]="searchQuery"
            (ngModelChange)="filterProjects()"
          >
        </div>
        
        <div class="projects-list__filter-group">
          <select class="form-control" [(ngModel)]="statusFilter" (ngModelChange)="filterProjects()">
            <option value="all">Tous les statuts</option>
            <option value="PLANNING">Planification</option>
            <option value="IN_PROGRESS">En cours</option>
            <option value="ON_HOLD">En pause</option>
            <option value="COMPLETED">Terminé</option>
            <option value="CANCELLED">Annulé</option>
          </select>
        </div>
        
        <div class="projects-list__view-toggle">
          <button 
            class="projects-list__view-btn" 
            [class.active]="viewMode === 'grid'"
            (click)="viewMode = 'grid'"
          >
            <i class="fas fa-th-large"></i>
          </button>
          <button 
            class="projects-list__view-btn" 
            [class.active]="viewMode === 'list'"
            (click)="viewMode = 'list'"
          >
            <i class="fas fa-list"></i>
          </button>
        </div>
      </div>
      
      <!-- Rest of the template remains the same -->
      
      <!-- Empty state -->
      <div class="projects-list__empty" *ngIf="filteredProjects.length === 0">
        <div class="projects-list__empty-icon">
          <i class="fas fa-project-diagram"></i>
        </div>
        <h3 class="projects-list__empty-title">Aucun projet trouvé</h3>
        <p class="projects-list__empty-message">
 </p>
        <button routerLink="/projects/new" class="btn btn-primary" >
          <i class="fas fa-plus"></i> Créer un projet
        </button>
      </div>
    </div>
  `,
  styles: [`
    .projects-list {
      padding: 20px;
      
      &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
      
      &__title {
        font-size: 2rem;
        font-weight: 700;
        margin: 0;
      }
      
      &__filters {
        display: flex;
        gap: 15px;
        margin-bottom: 20px;
        flex-wrap: wrap;
      }
      
      &__search {
        flex: 1;
        min-width: 250px;
        position: relative;
        
        &-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
        }
      }
      
      &__filter-group {
        width: 200px;
      }
      
      &__view-toggle {
        display: flex;
        gap: 5px;
      }
      
      &__view-btn {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #ddd;
        background-color: white;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
        
        &:hover {
          background-color: #f5f5f5;
        }
        
        &.active {
          background-color: #3f51b5;
          color: white;
          border-color: #3f51b5;
        }
      }
      
      &__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
      }
      
      &__table {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        
        .table {
          width: 100%;
          border-collapse: collapse;
          
          th, td {
            padding: 12px 15px;
            text-align: left;
          }
          
          th {
            background-color: #f5f7fa;
            font-weight: 600;
            color: #555;
            border-bottom: 1px solid #eee;
          }
          
          tr {
            border-bottom: 1px solid #eee;
            
            &:last-child {
              border-bottom: none;
            }
          }
        }
      }
      
      &__project-name {
        color: #3f51b5;
        font-weight: 500;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
      
      &__actions-cell {
        display: flex;
        gap: 5px;
      }
      
      &__empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 20px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        
        &-icon {
          font-size: 3rem;
          color: #ccc;
          margin-bottom: 20px;
        }
        
        &-title {
          font-size: 1.5rem;
          margin-bottom: 10px;
          font-weight: 600;
        }
        
        &-message {
          color: #666;
          text-align: center;
          max-width: 500px;
          margin-bottom: 20px;
        }
      }
    }
    
    .project-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }
      
      &__header {
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f0f0f0;
      }
      
      &__status {
        font-size: 0.8rem;
        font-weight: 500;
        padding: 4px 8px;
        border-radius: 4px;
        
        &--planning {
          background-color: rgba(3, 169, 244, 0.1);
          color: #03a9f4;
        }
        
        &--in_progress {
          background-color: rgba(255, 152, 0, 0.1);
          color: #ff9800;
        }
        
        &--on_hold {
          background-color: rgba(158, 158, 158, 0.1);
          color: #9e9e9e;
        }
        
        &--completed {
          background-color: rgba(76, 175, 80, 0.1);
          color: #4caf50;
        }
        
        &--cancelled {
          background-color: rgba(244, 67, 54, 0.1);
          color: #f44336;
        }
      }
      
      &__actions {
        position: relative;
      }
      
      &__action-btn {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: none;
        cursor: pointer;
        
        &:hover {
          color: #3f51b5;
        }
      }
      
      &__dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background-color: white;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        min-width: 180px;
        display: none;
        z-index: 10;
        
        &-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 15px;
          color: #333;
          text-decoration: none;
          font-size: 0.9rem;
          transition: background 0.2s ease;
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          
          &:hover {
            background-color: #f5f5f5;
          }
          
          &--delete {
            color: #f44336;
            
            &:hover {
              background-color: rgba(244, 67, 54, 0.05);
            }
          }
        }
      }
      
      &__actions:hover &__dropdown {
        display: block;
      }
      
      &__body {
        padding: 15px;
      }
      
      &__title {
        font-size: 1.1rem;
        margin-top: 0;
        margin-bottom: 10px;
        font-weight: 600;
      }
      
      &__description {
        color: #666;
        font-size: 0.9rem;
        margin: 0;
        line-height: 1.4;
        height: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      
      &__progress {
        padding: 0 15px 15px;
      }
      
      &__progress-label {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        font-size: 0.85rem;
        font-weight: 500;
      }
      
      &__progress-bar {
        height: 6px;
        background-color: #f0f0f0;
        border-radius: 3px;
        overflow: hidden;
      }
      
      &__progress-fill {
        height: 100%;
        background-color: #3f51b5;
      }
      
      &__footer {
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #f0f0f0;
      }
      
      &__dates {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      &__date {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.8rem;
        color: #666;
      }
      
      &__members {
        display: flex;
        gap: 5px;
      }
      
      &__member {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #3f51b5;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        font-size: 0.85rem;
        
        &--more {
          background-color: #f0f0f0;
          color: #666;
        }
      }
    }
    
    .project-status {
      font-size: 0.85rem;
      font-weight: 500;
      padding: 3px 8px;
      border-radius: 4px;
      
      &--planning {
        background-color: rgba(3, 169, 244, 0.1);
        color: #03a9f4;
      }
      
      &--in_progress {
        background-color: rgba(255, 152, 0, 0.1);
        color: #ff9800;
      }
      
      &--on_hold {
        background-color: rgba(158, 158, 158, 0.1);
        color: #9e9e9e;
      }
      
      &--completed {
        background-color: rgba(76, 175, 80, 0.1);
        color: #4caf50;
      }
      
      &--cancelled {
        background-color: rgba(244, 67, 54, 0.1);
        color: #f44336;
      }
    }
    
    .progress-bar {
      width: 100px;
      height: 6px;
      background-color: #f0f0f0;
      border-radius: 3px;
      overflow: hidden;
      margin-right: 10px;
      
      &__fill {
        height: 100%;
        background-color: #3f51b5;
      }
      
      &__value {
        font-size: 0.85rem;
        color: #666;
      }
    }
    
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      border: none;
      
      &-primary {
        background-color: #3f51b5;
        color: white;
        
        &:hover {
          background-color: #303f9f;
        }
      }
      
      &-icon {
        width: 32px;
        height: 32px;
        padding: 0;
        font-size: 0.9rem;
        color: #666;
        background: none;
        
        &:hover {
          background-color: #f5f5f5;
          color: #3f51b5;
        }
        
        &--danger:hover {
          color: #f44336;
        }
      }
    }
    
    .form-control {
      display: block;
      width: 100%;
      padding: 8px 12px;
      padding-left: 35px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.2s ease;
      
      &:focus {
        outline: none;
        border-color: #3f51b5;
      }
    }
    
    select.form-control {
      padding-left: 12px;
      -webkit-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='6' viewBox='0 0 8 6'%3E%3Cpath fill='%23666' d='M4 6L0 0h8z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      padding-right: 30px;
    }
  `]
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  
  viewMode: 'grid' | 'list' = 'grid';
  searchQuery: string = '';
  statusFilter: string = 'all';
  
  constructor() {}
  
  ngOnInit(): void {
    // Load mock data
    this.loadMockProjects();
    this.filterProjects();
  }
  
  loadMockProjects(): void {
    this.projects = [
      {
        id: 1,
        name: 'Refonte du site web',
        description: 'Refonte complète du site web de l\'entreprise avec un design moderne et responsive.',
        status: 'IN_PROGRESS',
        progress: 65,
        startDate: new Date('2023-01-15'),
        dueDate: new Date('2023-04-30'),
        owner: 'Jean Dupont',
        members: ['Jean Dupont', 'Marie Martin', 'Pierre Lefebvre', 'Sophie Bernard']
      },
      {
        id: 2,
        name: 'Application mobile',
        description: 'Développement d\'une application mobile pour iOS et Android.',
        status: 'IN_PROGRESS',
        progress: 40,
        startDate: new Date('2023-02-01'),
        dueDate: new Date('2023-06-30'),
        owner: 'Pierre Lefebvre',
        members: ['Pierre Lefebvre', 'Sophie Bernard']
      },
      {
        id: 3,
        name: 'Campagne marketing',
        description: 'Campagne marketing numérique pour le lancement du nouveau produit.',
        status: 'PLANNING',
        progress: 20,
        startDate: new Date('2023-03-01'),
        dueDate: new Date('2023-05-31'),
        owner: 'Marie Martin',
        members: ['Marie Martin', 'Jean Dupont']
      },
      {
        id: 4,
        name: 'Refactoring du code legacy',
        description: 'Modernisation du code legacy pour améliorer la performance et la maintenabilité.',
        status: 'COMPLETED',
        progress: 100,
        startDate: new Date('2022-11-10'),
        dueDate: new Date('2023-01-31'),
        owner: 'Sophie Bernard',
        members: ['Sophie Bernard', 'Pierre Lefebvre']
      },
      {
        id: 5,
        name: 'Automatisation des tests',
        description: 'Mise en place d\'une suite de tests automatisés pour le système principal.',
        status: 'ON_HOLD',
        progress: 50,
        startDate: new Date('2023-01-20'),
        dueDate: new Date('2023-03-15'),
        owner: 'Jean Dupont',
        members: ['Jean Dupont']
      },
      {
        id: 6,
        name: 'Mise à jour de la documentation',
        description: 'Mise à jour de la documentation technique pour tous les services.',
        status: 'CANCELLED',
        progress: 30,
        startDate: new Date('2022-12-01'),
        dueDate: new Date('2023-02-28'),
        owner: 'Marie Martin',
        members: ['Marie Martin', 'Sophie Bernard']
      }
    ];
  }
  
  filterProjects(): void {
    this.filteredProjects = this.projects.filter(project => {
      // Filter by search query
      const matchesSearch = 
        !this.searchQuery || 
        project.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      // Filter by status
      const matchesStatus = 
        this.statusFilter === 'all' || 
        project.status === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }
  
  getStatusLabel(status: string): string {
    switch (status) {
      case 'PLANNING': return 'Planification';
      case 'IN_PROGRESS': return 'En cours';
      case 'ON_HOLD': return 'En pause';
      case 'COMPLETED': return 'Terminé';
      case 'CANCELLED': return 'Annulé';
      default: return status;
    }
  }
  
  deleteProject(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projects = this.projects.filter(project => project.id !== id);
      this.filterProjects();
    }
  }
}