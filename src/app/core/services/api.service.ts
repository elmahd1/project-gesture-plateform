// src/app/core/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private useMocks = true; // Set to false when ready to connect to real backend

  constructor(private http: HttpClient) { }

  get<T>(endpoint: string, params?: any): Observable<T> {
    if (this.useMocks) {
      console.log(`Mock GET request to: ${endpoint}`);
      return this.getMockData<T>(endpoint);
    }

    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { params: httpParams });
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    if (this.useMocks) {
      console.log(`Mock POST request to: ${endpoint} with data:`, data);
      return this.getMockData<T>(endpoint);
    }
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    if (this.useMocks) {
      console.log(`Mock PUT request to: ${endpoint} with data:`, data);
      return this.getMockData<T>(endpoint);
    }
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  delete<T>(endpoint: string): Observable<T> {
    if (this.useMocks) {
      console.log(`Mock DELETE request to: ${endpoint}`);
      return this.getMockData<T>(endpoint);
    }
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`);
  }

  // Mock data helper
  private getMockData<T>(endpoint: string): Observable<T> {
    // Add mock responses based on endpoint
    if (endpoint.includes('utilisateurs')) {
      return of([{ id: 1, nom: 'Admin', prenom: 'User', email: 'admin@example.com', role: 'ADMIN' }] as unknown as T);
    }
    
    if (endpoint.includes('projets')) {
      return of([
        { id: 1, nom: 'Website Redesign', description: 'Refonte complète du site web', statut: 'EN_COURS', progress: 60 },
        { id: 2, nom: 'Application Mobile', description: 'Développement app iOS et Android', statut: 'PLANNING', progress: 20 }
      ] as unknown as T);
    }
    
    if (endpoint.includes('taches')) {
      return of([
        { id: 1, titre: 'Conception UX', description: 'Wireframes et maquettes', statut: 'TERMINE', priorite: 'ELEVEE', dateFin: new Date() },
        { id: 2, titre: 'Développement Frontend', description: 'Implémentation HTML/CSS', statut: 'EN_COURS', priorite: 'MOYENNE', dateFin: new Date() }
      ] as unknown as T);
    }
    
    // Default empty response
    return of([] as unknown as T);
  }
}