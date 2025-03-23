import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Projet } from '../models/projet.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private endpoint = 'projets';

  constructor(private apiService: ApiService) { }

  /**
   * Get all projects
   * @returns Observable of Projet array
   */
  getProjects(): Observable<Projet[]> {
    return this.apiService.get<Projet[]>(this.endpoint);
  }

  /**
   * Get project by ID
   * @param id Project ID
   * @returns Observable of Projet
   */
  getProjectById(id: number): Observable<Projet> {
    return this.apiService.get<Projet>(`${this.endpoint}/${id}`);
  }

  /**
   * Create new project
   * @param projet Project data
   * @returns Observable of created Projet
   */
  createProject(projet: Projet): Observable<Projet> {
    return this.apiService.post<Projet>(this.endpoint, projet);
  }

  /**
   * Update existing project
   * @param id Project ID
   * @param projet Updated project data
   * @returns Observable of updated Projet
   */
  updateProject(id: number, projet: Partial<Projet>): Observable<Projet> {
    return this.apiService.put<Projet>(`${this.endpoint}/${id}`, projet);
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
  getProjectTasks(id: number): Observable<any[]> {
    return this.apiService.get<any[]>(`${this.endpoint}/${id}/taches`);
  }

  /**
   * Get project members
   * @param id Project ID
   * @returns Observable of members for the project
   */
  getProjectMembers(id: number): Observable<any[]> {
    return this.apiService.get<any[]>(`${this.endpoint}/${id}/membres`);
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
   * Update project progress
   * @param id Project ID
   * @param progress Progress percentage (0-100)
   * @returns Observable of updated Projet
   */
  updateProjectProgress(id: number, progress: number): Observable<Projet> {
    return this.apiService.put<Projet>(`${this.endpoint}/${id}/progress`, { progress });
  }

  /**
   * Change project status
   * @param id Project ID
   * @param status New status
   * @returns Observable of updated Projet
   */
  updateProjectStatus(id: number, status: string): Observable<Projet> {
    return this.apiService.put<Projet>(`${this.endpoint}/${id}/status`, { status });
  }
}