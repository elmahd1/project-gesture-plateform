import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private endpoint = 'utilisateurs';

  constructor(private apiService: ApiService) { }

  /**
   * Get all users
   * @returns Observable of Utilisateur array
   */
  getAllUtilisateurs(): Observable<Utilisateur[]> {
    return this.apiService.get<Utilisateur[]>(this.endpoint);
  }

  /**
   * Get user by ID
   * @param id User ID
   * @returns Observable of Utilisateur
   */
  getUtilisateurById(id: number): Observable<Utilisateur> {
    return this.apiService.get<Utilisateur>(`${this.endpoint}/${id}`);
  }

  /**
   * Create new user
   * @param utilisateur User data
   * @returns Observable of created Utilisateur
   */
  createUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.apiService.post<Utilisateur>(this.endpoint, utilisateur);
  }

  /**
   * Update existing user
   * @param id User ID
   * @param utilisateur Updated user data
   * @returns Observable of updated Utilisateur
   */
  updateUtilisateur(id: number, utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.apiService.put<Utilisateur>(`${this.endpoint}/${id}`, utilisateur);
  }

  /**
   * Delete user
   * @param id User ID
   * @returns Observable of operation result
   */
  deleteUtilisateur(id: number): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }

  /**
   * Get users by project
   * @param projetId Project ID
   * @returns Observable of Utilisateur array
   */
  getUtilisateursByProjet(projetId: number): Observable<Utilisateur[]> {
    return this.apiService.get<Utilisateur[]>(`${this.endpoint}/projet/${projetId}`);
  }

  /**
   * Get assigned tasks for a user
   * @param id User ID
   * @returns Observable of tasks assigned to the user
   */
  getUtilisateurTasks(id: number): Observable<any[]> {
    return this.apiService.get<any[]>(`${this.endpoint}/${id}/taches`);
  }

  /**
   * Get projects for a user
   * @param id User ID
   * @returns Observable of projects for the user
   */
  getUtilisateurProjets(id: number): Observable<any[]> {
    return this.apiService.get<any[]>(`${this.endpoint}/${id}/projets`);
  }
}