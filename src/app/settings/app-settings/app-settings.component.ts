import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="app-settings-container">
      <h1>Paramètres de l'Application</h1>

      <div class="settings-section">
        <h2>Préférences Générales</h2>
        <div class="setting-item">
          <label>
            <input type="checkbox" [(ngModel)]="darkMode">
            Mode Sombre
          </label>
        </div>
        <div class="setting-item">
          <label>Langue</label>
          <select [(ngModel)]="selectedLanguage">
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      <div class="settings-section">
        <h2>Notifications</h2>
        <div class="setting-item">
          <label>
            <input type="checkbox" [(ngModel)]="emailNotifications">
            Notifications par Email
          </label>
        </div>
        <div class="setting-item">
          <label>
            <input type="checkbox" [(ngModel)]="desktopNotifications">
            Notifications de Bureau
          </label>
        </div>
      </div>

      <div class="settings-section">
        <h2>Confidentialité</h2>
        <div class="setting-item">
          <label>
            <input type="checkbox" [(ngModel)]="shareAnalytics">
            Partager des données anonymes pour améliorer l'application
          </label>
        </div>
      </div>

      <button (click)="saveSettings()" class="save-button">
        Enregistrer les Paramètres
      </button>
    </div>
  `,
  styles: [`
    .app-settings-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f5f7;
    }

    .settings-section {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    .save-button {
      width: 100%;
      padding: 10px;
      background-color: #4f46e5;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  `]
})
export class AppSettingsComponent implements OnInit {
  darkMode = false;
  selectedLanguage = 'fr';
  emailNotifications = true;
  desktopNotifications = false;
  shareAnalytics = false;

  constructor() {}

  ngOnInit(): void {
    // Load existing settings from local storage or service
  }

  saveSettings(): void {
    // Save settings logic
    console.log('Paramètres enregistrés', {
      darkMode: this.darkMode,
      language: this.selectedLanguage,
      emailNotifications: this.emailNotifications,
      desktopNotifications: this.desktopNotifications,
      shareAnalytics: this.shareAnalytics
    });
  }
}