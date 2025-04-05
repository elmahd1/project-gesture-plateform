import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Projet } from '../models/projet.model';
import { Tache } from '../models/tache.model';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private endpoint = 'projets';

  constructor(private apiService: ApiService) {}

  /**
   * Get all projects
   * @returns Observable of Projet array
   */
  getProjects(): Observable<Projet[]> {
    return this.apiService.get<Projet[]>(this.endpoint)
      .pipe(
        map(projets => this.convertDateFields(projets))
      );
  }

  /**
   * Get project by ID
   * @param id Project ID
   * @returns Observable of Projet
   */
  getProjectById(id: number): Observable<Projet> {
    return this.apiService.get<Projet>(`${this.endpoint}/${id}`)
      .pipe(
        map(projet => this.convertDateFields([projet])[0])
      );
  }

  /**
   * Create new project
   * @param projet Project data
   * @returns Observable of created Projet
   */
  createProject(projet: Projet): Observable<Projet> {
    return this.apiService.post<Projet>(this.endpoint, projet)
      .pipe(
        map(projet => this.convertDateFields([projet])[0])
      );
  }

  /**
   * Update existing project
   * @param id Project ID
   * @param projet Updated project data
   * @returns Observable of updated Projet
   */
  updateProject(id: number, projet: Partial<Projet>): Observable<Projet> {
    return this.apiService.put<Projet>(`${this.endpoint}/${id}`, projet)
      .pipe(
        map(projet => this.convertDateFields([projet])[0])
      );
  }

  /**
   * Delete project
   * @param id Project ID
   * @returns Observable of operation result
   */
  deleteProject(id: number): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }

  /**
   * Get project tasks
   * @param id Project ID
   * @returns Observable of tasks for the project
   */
  getProjectTasks(id: number): Observable<Tache[]> {
    return this.apiService.get<Tache[]>(`${this.endpoint}/${id}/taches`)
      .pipe(
        map(taches => taches.map(tache => ({
          ...tache,
          dateDebut: tache.dateDebut ? new Date(tache.dateDebut) : tache.dateDebut,
          dateFin: tache.dateFin ? new Date(tache.dateFin) : tache.dateFin,
          // Ensure backward compatibility
          datefin: tache.dateFin
        })))
      );
  }

  /**
   * Get project members
   * @param id Project ID
   * @returns Observable of members for the project
   */
  getProjectMembers(id: number): Observable<Utilisateur[]> {
    return this.apiService.get<Utilisateur[]>(`${this.endpoint}/${id}/membres`);
  }

  /**
   * Add member to project
   * @param projectId Project ID
   * @param userId User ID
   * @returns Observable of operation result
   */
  addProjectMember(projectId: number, userId: number): Observable<any> {
    return this.apiService.post<any>(`${this.endpoint}/${projectId}/membres`, { userId });
  }

  /**
   * Remove member from project
   * @param projectId Project ID
   * @param userId User ID
   * @returns Observable of operation result
   */
  removeProjectMember(projectId: number, userId: number): Observable<any> {
    return this.apiService.delete<any>(`${this.endpoint}/${projectId}/membres/${userId}`);
  }

  /**
   * Update project status
   * @param id Project ID
   * @param status New status
   * @returns Observable of updated Projet
   */
  updateProjectStatus(id: number, status: string): Observable<Projet> {
    return this.apiService.put<Projet>(`${this.endpoint}/${id}/statut`, { statut: status })
      .pipe(
        map(projet => this.convertDateFields([projet])[0])
      );
  }

  /**
   * Helper method to convert string dates to Date objects and ensure backward compatibility
   */
  private convertDateFields(projets: Projet[]): Projet[] {
    return projets.map(projet => ({
      ...projet,
      dateDebut: projet.dateDebut ? new Date(projet.dateDebut) : projet.dateDebut,
      dateFin: projet.dateFin ? new Date(projet.dateFin) : projet.dateFin,
      updatedAt: projet.updatedAt ? new Date(projet.updatedAt) : projet.updatedAt,
      // Ensure backward compatibility
      status: projet.statut,
      progress: projet.progression,
      startDate: projet.dateDebut,
      dueDate: projet.dateFin
    }));
  }
}