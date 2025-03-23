import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notification-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="notification-settings-container">
      <h1>Paramètres de Notification</h1>

      <div class="notification-types">
        <div *ngFor="let type of notificationTypes" class="notification-type">
          <h3>{{ type.label }}</h3>
          <div class="notification-channels">
            <label>
              <input 
                type="checkbox" 
                [(ngModel)]="type.email"
              >
              Email
            </label>
            <label>
              <input 
                type="checkbox" 
                [(ngModel)]="type.sms"
              >
              SMS
            </label>
            <label>
              <input 
                type="checkbox" 
                [(ngModel)]="type.inApp"
              >
              Notification In-App
            </label>
          </div>
        </div>
      </div>

      <button (click)="saveNotificationSettings()" class="save-button">
        Enregistrer les Paramètres
      </button>
    </div>
  `,
  styles: [`
    .notification-settings-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f5f7;
    }

    .notification-types {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .notification-type {
      margin-bottom: 20px;
      border-bottom: 1px solid #eee;
      padding-bottom: 15px;
    }

    .notification-channels {
      display: flex;
      gap: 20px;
    }

    .save-button {
      width: 100%;
      padding: 10px;
      background-color: #4f46e5;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 20px;
    }
  `]
})
export class NotificationSettingsComponent implements OnInit {
  notificationTypes = [
    {
      label: 'Notifications de Projet',
      email: true,
      sms: false,
      inApp: true
    },
    {
      label: 'Notifications de Tâche',
      email: true,
      sms: false,
      inApp: true
    },
    {
      label: 'Notifications d\'Équipe',
      email: false,
      sms: false,
      inApp: true
    }
  ];

  constructor() {}

  ngOnInit(): void {
    // Load existing notification settings
  }

  saveNotificationSettings(): void {
    console.log('Paramètres de notification enregistrés', this.notificationTypes);
    // Implement save logic
  }
}