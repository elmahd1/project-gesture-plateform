import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'pending' | 'inactive';
}

@Component({
  selector: 'app-team-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="team-settings-container">
      <h1>Paramètres d'Équipe</h1>

      <div class="invite-member-section">
        <h2>Inviter un Nouveau Membre</h2>
        <form 
          [formGroup]="inviteMemberForm" 
          (ngSubmit)="onInviteMember()"
        >
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email" 
              placeholder="Email du membre"
            >
          </div>

          <div class="form-group">
            <label for="role">Rôle</label>
            <select 
              id="role" 
              formControlName="role"
            >
              <option value="MEMBRE">Membre</option>
              <option value="MANAGER">Gestionnaire</option>
              <option value="ADMIN">Administrateur</option>
            </select>
          </div>

          <button 
            type="submit" 
            [disabled]="inviteMemberForm.invalid"
          >
            Inviter
          </button>
        </form>
      </div>

      <div class="team-members-section">
        <h2>Membres de l'Équipe</h2>
        <div class="team-members-list">
          <div 
            *ngFor="let member of teamMembers" 
            class="team-member-card"
          >
            <div class="member-info">
              <h3>{{ member.name }}</h3>
              <p>{{ member.email }}</p>
              <span 
                class="member-role" 
                [ngClass]="member.role.toLowerCase()"
              >
                {{ getRoleLabel(member.role) }}
              </span>
            </div>
            <div class="member-status">
              <span 
                class="status-badge" 
                [ngClass]="member.status"
              >
                {{ getStatusLabel(member.status) }}
              </span>
            </div>
            <div class="member-actions">
              <button (click)="changeRole(member)">
                Changer de rôle
              </button>
              <button 
                class="remove-btn" 
                (click)="removeMember(member)"
              >
                Retirer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .team-settings-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f5f7;
    }

    .invite-member-section, 
    .team-members-section {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .invite-member-section form {
      display: flex;
      gap: 15px;
      align-items: center;

      .form-group {
        flex: 1;
      }

      input, select {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      button {
        padding: 10px 15px;
        background-color: #4f46e5;
        color: white;
        border: none;
        border-radius: 4px;
      }
    }

    .team-member-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      padding: 15px 0;

      .member-info {
        flex: 1;

        .member-role {
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          margin-top: 5px;
          display: inline-block;

          &.membre { background-color: #10b981; color: white; }
          &.manager { background-color: #f59e0b; color: white; }
          &.admin { background-color: #ef4444; color: white; }
        }
      }

      .member-status .status-badge {
        padding: 5px 10px;
        border-radius: 12px;
        font-size: 0.8rem;

        &.active { background-color: #10b981; color: white; }
        &.pending { background-color: #f59e0b; color: white; }
        &.inactive { background-color: #6b7280; color: white; }
      }

      .member-actions {
        display: flex;
        gap: 10px;

        button {
          padding: 5px 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;

          &.remove-btn {
            background-color: #ef4444;
            color: white;
          }
        }
      }
    }
  `]
})
export class TeamSettingsComponent implements OnInit {
  teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      role: 'ADMIN',
      status: 'active'
    },
    {
      id: 2,
      name: 'Sophie Martin',
      email: 'sophie.martin@example.com',
      role: 'MANAGER',
      status: 'active'
    },
    {
      id: 3,
      name: 'Pierre Leroy',
      email: 'pierre.leroy@example.com',
      role: 'MEMBRE',
      status: 'pending'
    }
  ];

  inviteMemberForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.inviteMemberForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['MEMBRE', Validators.required]
    });
  }

  ngOnInit(): void {}

  onInviteMember(): void {
    if (this.inviteMemberForm.valid) {
      const newMember: TeamMember = {
        id: this.teamMembers.length + 1,
        name: this.inviteMemberForm.value.email.split('@')[0],
        email: this.inviteMemberForm.value.email,
        role: this.inviteMemberForm.value.role,
        status: 'pending'
      };

      this.teamMembers.push(newMember);
      this.inviteMemberForm.reset({ role: 'MEMBRE' });
    }
  }

  // changeRole(member: TeamMember): void {
  //   const roles = ['MEMBRE', 'changeRole(member: TeamMember): void {
  //   const roles = ['MEMBRE', 'MANAGER', 'ADMIN'];
  //   const currentRoleIndex = roles.indexOf(member.role);
  //   const nextRoleIndex = (currentRoleIndex + 1) % roles.length;
  //   member.role = roles[nextRoleIndex];
  // }

  removeMember(member: TeamMember): void {
    this.teamMembers = this.teamMembers.filter(m => m.id !== member.id);
  }

  getRoleLabel(role: string): string {
    const roleLabels: { [key: string]: string } = {
      'MEMBRE': 'Membre',
      'MANAGER': 'Gestionnaire',
      'ADMIN': 'Administrateur'
    };
    return roleLabels[role] || role;
  }

  getStatusLabel(status: string): string {
    const statusLabels: { [key: string]: string } = {
      'active': 'Actif',
      'pending': 'En attente',
      'inactive': 'Inactif'
    };
    return statusLabels[status] || status;
  }
}