import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  avatar?: string;
}

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="users-list-container">
      <div class="users-header">
        <h1>Membres de l'Équipe</h1>
        <div class="actions">
          <button 
            class="btn-add-user" 
            routerLink="/users/new"
          >
            <i class="fas fa-plus"></i> Ajouter un Membre
          </button>
        </div>
      </div>

      <div class="filters">
        <select (change)="filterUsers($event)">
          <option value="">Tous les Rôles</option>
          <option value="ADMIN">Administrateur</option>
          <option value="MANAGER">Gestionnaire</option>
          <option value="MEMBRE">Membre</option>
        </select>
      </div>

      <div class="users-grid">
        <div 
          *ngFor="let user of filteredUsers" 
          class="user-card"
        >
          <div class="user-avatar">
            <img 
              [src]="user.avatar || 'assets/images/default-avatar.jpg'" 
              [alt]="user.nom + ' ' + user.prenom"
            >
            <span 
              class="status-indicator" 
              [ngClass]="user.status"
            ></span>
          </div>
          
          <div class="user-info">
            <h3>{{ user.nom }} {{ user.prenom }}</h3>
            <p>{{ user.email }}</p>
            <span 
              class="user-role" 
              [ngClass]="getRoleClass(user.role)"
            >
              {{ getRoleLabel(user.role) }}
            </span>
          </div>
          
          <div class="user-actions">
            <button 
              class="btn-view" 
              [routerLink]="['/users', user.id]"
            >
              <i class="fas fa-eye"></i>
            </button>
            <button 
              class="btn-edit" 
              [routerLink]="['/users', user.id, 'edit']"
            >
              <i class="fas fa-edit"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .users-list-container {
      padding: 20px;
      background-color: #f4f5f7;
    }

    .users-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .btn-add-user {
        background-color: #4f46e5;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }

    .filters {
      margin-bottom: 20px;
    }

    .users-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }

    .user-card {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      display: flex;
      align-items: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .user-avatar {
      position: relative;
      margin-right: 15px;

      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        object-fit: cover;
      }

      .status-indicator {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 2px solid white;

        &.online { background-color: #10b981; }
        &.offline { background-color: #ef4444; }
        &.away { background-color: #f59e0b; }
        &.busy { background-color: #6366f1; }
      }
    }

    .user-info {
      flex-grow: 1;

      h3 {
        margin: 0 0 5px 0;
        color: #333;
      }

      p {
        margin: 0 0 10px 0;
        color: #666;
      }

      .user-role {
        padding: 3px 8px;
        border-radius: 12px;
        font-size: 0.8rem;
        
        &.admin { background-color: #ef4444; color: white; }
        &.manager { background-color: #f59e0b; color: white; }
        &.membre { background-color: #10b981; color: white; }
      }
    }

    .user-actions {
      display: flex;
      flex-direction: column;
      gap: 10px;

      button {
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        
        &:hover {
          color: #4f46e5;
        }
      }
    }
  `]
})
export class UsersListComponent implements OnInit {
  users: User[] = [
    {
      id: 1,
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      role: 'ADMIN',
      status: 'online',
      avatar: 'assets/images/avatar1.jpg'
    },
    {
      id: 2,
      nom: 'Martin',
      prenom: 'Sophie',
      email: 'sophie.martin@example.com',
      role: 'MANAGER',
      status: 'away',
      avatar: 'assets/images/avatar2.jpg'
    },
    {
      id: 3,
      nom: 'Leroy',
      prenom: 'Pierre',
      email: 'pierre.leroy@example.com',
      role: 'MEMBRE',
      status: 'offline'
    },
    {
      id: 4,
      nom: 'Dubois',
      prenom: 'Marie',
      email: 'marie.dubois@example.com',
      role: 'MEMBRE',
      status: 'busy'
    }
  ];

  filteredUsers: User[] = [];

  ngOnInit(): void {
    this.filteredUsers = this.users;
  }

  filterUsers(event: Event): void {
    const role = (event.target as HTMLSelectElement).value;
    
    this.filteredUsers = role 
      ? this.users.filter(user => user.role === role)
      : this.users;
  }

  getRoleClass(role: string): string {
    const roleClasses: { [key: string]: string } = {
      'ADMIN': 'admin',
      'MANAGER': 'manager',
      'MEMBRE': 'membre'
    };
    return roleClasses[role] || '';
  }

  getRoleLabel(role: string): string {
    const roleLabels: { [key: string]: string } = {
      'ADMIN': 'Administrateur',
      'MANAGER': 'Gestionnaire',
      'MEMBRE': 'Membre'
    };
    return roleLabels[role] || role;
  }
}