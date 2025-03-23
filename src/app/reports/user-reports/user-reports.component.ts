import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../core/services/rapport.service';
import { UtilisateurService } from '../../core/services/utilisateur.service';
import { Utilisateur } from '../../core/models/utilisateur.model';

@Component({
  selector: 'app-user-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="user-reports-container">
      <h1>Rapports d'Utilisateurs</h1>

      <div class="report-filters">
        <select [(ngModel)]="selectedRole">
          <option value="">Tous les Rôles</option>
          <option value="ADMIN">Administrateur</option>
          <option value="MANAGER">Gestionnaire</option>
          <option value="MEMBRE">Membre</option>
        </select>

        <button (click)="generateUserReport()">
          Générer Rapport
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of filteredUsers">
            <td>{{ user.nom }} {{ user.prenom }}</td>
            <td>{{ user.email }}</td>
            <td>{{ getRoleLabel(user.role) }}</td>
            <td>{{ user.status || 'Non défini' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .user-reports-container {
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
export class UserReportsComponent implements OnInit {
  users: Utilisateur[] = [];
  selectedRole = '';

  constructor(
    private utilisateurService: UtilisateurService,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.utilisateurService.getAllUtilisateurs().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Erreur de chargement des utilisateurs', error);
      }
    });
  }

  get filteredUsers(): Utilisateur[] {
    return this.selectedRole 
      ? this.users.filter(u => u.role === this.selectedRole)
      : this.users;
  }

  getRoleLabel(role: string): string {
    const roleLabels: { [key: string]: string } = {
      'ADMIN': 'Administrateur',
      'MANAGER': 'Gestionnaire',
      'MEMBRE': 'Membre'
    };
    return roleLabels[role] || role;
  }

  generateUserReport(): void {
    const reportData = this.filteredUsers.map(user => ({
      Nom: `${user.nom} ${user.prenom}`,
      Email: user.email,
      Rôle: this.getRoleLabel(user.role),
      Statut: user.status || 'Non défini'
    }));

    this.reportService.generatePDF(
      'Rapport des Utilisateurs', 
      ['Nom', 'Email', 'Rôle', 'Statut'],
      reportData
    );
  }
}