import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'C:\\Users\\DELL\\Documents\\Workflow Frontend\\workflow\\src\\app\\core\\services\\api.service';

@Component({
  selector: 'app-backend-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="backend-test-container">
      <h2>Test de Connexion au Backend</h2>
      
      <div *ngIf="loading" class="loading-state">
        <p>Test de connexion en cours...</p>
      </div>
      
      <div *ngIf="error" class="error-state">
        <h3>Erreur de Connexion</h3>
        <p>{{ error }}</p>
      </div>
      
      <div *ngIf="!loading && !error" class="success-state">
        <h3>Connexion Réussie</h3>
        <div class="response-data">
          <h4>Réponse du Serveur:</h4>
          <pre>{{ responseData | json }}</pre>
        </div>
      </div>
      
      <div class="actions">
        <button (click)="testConnection()" [disabled]="loading">
          {{ loading ? 'Test en cours...' : 'Tester à nouveau' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .backend-test-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
      background-color: #f8f9fa;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    h2 {
      color: #4f46e5;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    
    .loading-state, .error-state, .success-state {
      padding: 15px;
      border-radius: 6px;
      margin-bottom: 20px;
    }
    
    .loading-state {
      background-color: #eff6ff;
      border: 1px solid #93c5fd;
    }
    
    .error-state {
      background-color: #fef2f2;
      border: 1px solid #fca5a5;
    }
    
    .success-state {
      background-color: #ecfdf5;
      border: 1px solid #a7f3d0;
    }
    
    .response-data {
      background-color: #ffffff;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #d1d5db;
      margin-top: 10px;
    }
    
    pre {
      white-space: pre-wrap;
      overflow-x: auto;
      font-family: monospace;
      margin: 0;
    }
    
    .actions {
      margin-top: 20px;
      text-align: center;
    }
    
    button {
      padding: 10px 15px;
      background-color: #4f46e5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }
    
    button:hover {
      background-color: #4338ca;
    }
    
    button:disabled {
      background-color: #c7d2fe;
      cursor: not-allowed;
    }
  `]
})
export class BackendTestComponent implements OnInit {
  loading = false;
  error = '';
  responseData: any = null;
  
  constructor(private apiService: ApiService) {}
  
  ngOnInit(): void {
    this.testConnection();
  }
  
  testConnection(): void {
    this.loading = true;
    this.error = '';
    this.responseData = null;
    
    // Try different endpoints to test the connection
    this.apiService.get<any>('health-check')
      .subscribe({
        next: (response) => {
          this.responseData = response;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error with health-check endpoint:', err);
          // If health-check fails, try the /api endpoint
          this.tryApiEndpoint();
        }
      });
  }
  
  private tryApiEndpoint(): void {
    this.apiService.get<any>('')
      .subscribe({
        next: (response) => {
          this.responseData = response;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error with API endpoint:', err);
          // Try endpoints for specific entities
          this.tryEntityEndpoints();
        }
      });
  }
  
  private tryEntityEndpoints(): void {
    // Try to fetch users as a last resort
    this.apiService.get<any>('utilisateurs')
      .subscribe({
        next: (response) => {
          this.responseData = response;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to connect to backend:', err);
          this.error = `Impossible de se connecter au backend: ${err.message || 'Erreur inconnue'}. 
                        Vérifiez que le serveur backend est en cours d'exécution et que l'URL API configurée est correcte.`;
          this.loading = false;
        }
      });
  }
}