import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Utilisateur } from '../models/utilisateur.model';
import { Tache } from '../models/tache.model';
import { Projet } from '../models/projet.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private endpoint = 'utilisateurs';

  constructor(private apiService: ApiService) {}

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
  updateUtilisateur(id: number, utilisateur: Partial<Utilisateur>): Observable<Utilisateur> {
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
    return this.apiService.get<Utilisateur[]>(`projets/${projetId}/membres`);
  }

  /**
   * Get assigned tasks for a user
   * @param id User ID
   * @returns Observable of tasks assigned to the user
   */
  getUtilisateurTasks(id: number): Observable<Tache[]> {
    return this.apiService.get<Tache[]>(`taches`, { assigneId: id })
      .pipe(
        map(taches => taches.map(tache => ({
          ...tache,
          dateDebut: tache.dateDebut ? new Date(tache.dateDebut) : tache.dateDebut,
          dateFin: tache.dateFin ? new Date(tache.dateFin) : tache.dateFin,
          // Ensure backward compatibility
          datefin: tache.dateFin,
          status: tache.statut
        })))
      );
  }

  /**
   * Get projects for a user
   * @param id User ID
   * @returns Observable of projects for the user
   */
  getUtilisateurProjets(id: number): Observable<Projet[]> {
    return this.apiService.get<Projet[]>(`projets`, { membreId: id })
      .pipe(
        map(projets => projets.map(projet => ({
          ...projet,
          dateDebut: projet.dateDebut ? new Date(projet.dateDebut) : projet.dateDebut,
          dateFin: projet.dateFin ? new Date(projet.dateFin) : projet.dateFin,
          // Ensure backward compatibility
          status: projet.statut,
          progress: projet.progression,
          startDate: projet.dateDebut,
          dueDate: projet.dateFin
        })))
      );
  }

  /**
   * Assign a task to user
   * @param userId User ID
   * @param taskId Task ID
   * @returns Observable of operation result
   */
  assignerTache(userId: number, taskId: number): Observable<any> {
    return this.apiService.post<any>(`${this.endpoint}/${userId}/assigner-tache`, { tacheId: taskId });
  }

  /**
   * Create a comment on a task by user
   * @param userId User ID
   * @param taskId Task ID
   * @param commentText Comment text
   * @returns Observable of operation result
   */
  creerCommentaire(userId: number, taskId: number, commentText: string): Observable<any> {
    return this.apiService.post<any>(`${this.endpoint}/${userId}/creer-commentaire`, {
      tacheId: taskId,
      commentaire: commentText
    });
  }

  /**
   * Get users by role
   * @param role User role
   * @returns Observable of Utilisateur array
   */
  getUtilisateursByRole(role: string): Observable<Utilisateur[]> {
    return this.apiService.get<Utilisateur[]>(`${this.endpoint}/role/${role}`);
  }

  /**
   * Change user role
   * @param id User ID
   * @param role New role
   * @returns Observable of updated Utilisateur
   */
  changeUtilisateurRole(id: number, role: string): Observable<Utilisateur> {
    return this.apiService.put<Utilisateur>(`${this.endpoint}/${id}/role`, { role });
  }
}