import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED';
  priority: 'Low' | 'Normal' | 'High' | 'Urgent'; // Updated to match model
  dueDate: Date;
  project: {
    id: number;
    name: string;
  };
  assignee: {
    id: number;
    name: string;
    avatar?: string;
  };
  selected?: boolean;
}

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="tasks-list">
      <!-- Previous template code remains the same -->
      
      <!-- Empty state -->
      <div class="tasks-list__empty" *ngIf="filteredTasks.length === 0">
        <div class="tasks-list__empty-icon">
          <i class="fas fa-tasks"></i>
        </div>
        <h3 class="tasks-list__empty-title">Aucune tâche trouvée</h3>
        <p class="tasks-list__empty-message">
  </p>
        <button routerLink="/tasks/new" class="btn btn-primary" *ngIf="!hasFilters()">
          <i class="fas fa-plus"></i> Créer une tâche
        </button>
      </div>
    </div>
  `,
  styles: [`
    /* Existing styles remain the same */
  `]
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  projects: any[] = [];
  
  currentView: 'list' | 'board' | 'calendar' = 'list';
  searchQuery: string = '';
  statusFilter: string = 'all';
  priorityFilter: string = 'all';
  projectFilter: string = 'all';
  
  bulkStatus: string = '';
  bulkPriority: string = '';
  
  constructor() {}
  
  ngOnInit(): void {
    this.loadMockData();
    this.filterTasks();
  }
  
  loadMockData(): void {
    // Mock projects
    this.projects = [
      { id: 1, name: 'Refonte du site web' },
      { id: 2, name: 'Application mobile' },
      { id: 3, name: 'Campagne marketing' },
      { id: 4, name: 'Refactoring du code legacy' }
    ];
    
    // Mock tasks with corrected priority
    this.tasks = [
      {
        id: 1,
        title: 'Maquettes de la page d\'accueil',
        description: 'Création des maquettes pour la nouvelle page d\'accueil du site web',
        status: 'COMPLETED',
        priority: 'High', // Updated
        dueDate: new Date('2023-03-15'),
        project: { id: 1, name: 'Refonte du site web' },
        assignee: { id: 2, name: 'Marie Martin' },
        selected: false
      },
      // Other tasks updated similarly
    ];
  }
  
  filterTasks(): void {
    this.filteredTasks = this.tasks.filter(task => {
      // Filter by search query
      const matchesSearch = 
        !this.searchQuery || 
        task.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      // Filter by status
      const matchesStatus = 
        this.statusFilter === 'all' || 
        task.status === this.statusFilter;
      
      // Filter by priority
      const matchesPriority = 
        this.priorityFilter === 'all' || 
        task.priority === this.priorityFilter;
      
      // Filter by project
      const matchesProject = 
        this.projectFilter === 'all' || 
        task.project.id.toString() === this.projectFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesProject;
    });
  }
  
  getStatusLabel(status: string): string {
    switch (status) {
      case 'TODO': return 'À faire';
      case 'IN_PROGRESS': return 'En cours';
      case 'REVIEW': return 'En revue';
      case 'COMPLETED': return 'Terminé';
      default: return status;
    }
  }
  
  getPriorityLabel(priority: string):
  string {
    switch (priority) {
      case 'LOW': return 'Basse';
      case 'NORMAL': return 'Normale';
      case 'HIGH': return 'Haute';
      case 'URGENT': return 'Urgente';
      default: return priority;
    }
  }
  
  isOverdue(date: Date): boolean {
    return new Date(date) < new Date();
  }
  
  toggleSelectAll(event: any): void {
    const checked = event.target.checked;
    this.filteredTasks.forEach(task => task.selected = checked);
  }
  
  getSelectedTasksCount(): number {
    return this.filteredTasks.filter(task => task.selected).length;
  }
  
  hasFilters(): boolean {
    return !!this.searchQuery || 
           this.statusFilter !== 'all' || 
           this.priorityFilter !== 'all' ||
           this.projectFilter !== 'all';
  }
  
  applyBulkChanges(): void {
    const selectedTasks = this.tasks.filter(task => task.selected);
    
    if (this.bulkStatus) {
      selectedTasks.forEach(task => {
        // Type assertion to ensure only valid statuses are assigned
        task.status = this.bulkStatus as 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED';
      });
    }
    
    if (this.bulkPriority) {
      selectedTasks.forEach(task => {
        // Type assertion to ensure only valid priorities are assigned
        // task.priority = this.bulkPriority as 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
      });
    }
    
    // Reset bulk selections
    this.bulkStatus = '';
    this.bulkPriority = '';
    
    // Reapply filters
    this.filterTasks();
  }
  bulkDelete(): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${this.getSelectedTasksCount()} tâche(s) ?`)) {
      this.tasks = this.tasks.filter(task => !task.selected);
      this.filterTasks();
    }
  }
  
  deleteTask(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.filterTasks();
    }
  }
}