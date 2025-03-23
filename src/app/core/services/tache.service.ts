import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Tache } from '../models/tache.model';

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private endpoint = 'taches';

  constructor(private apiService: ApiService) {}

  /**
   * Get all tasks
   * @returns Observable of Tache array
   */
  getTasks(): Observable<Tache[]> {
    return this.apiService.get<Tache[]>(this.endpoint);
  }

  /**
   * Get task by ID
   * @param id Task ID
   * @returns Observable of Tache
   */
  getTaskById(id: number): Observable<Tache> {
    return this.apiService.get<Tache>(`${this.endpoint}/${id}`);
  }

  /**
   * Create new task
   * @param tache Task data
   * @returns Observable of created Tache
   */
  createTask(tache: Tache): Observable<Tache> {
    return this.apiService.post<Tache>(this.endpoint, tache);
  }

  /**
   * Update existing task
   * @param id Task ID
   * @param tache Updated task data
   * @returns Observable of updated Tache
   */
  updateTask(id: number, tache: Partial<Tache>): Observable<Tache> {
    return this.apiService.put<Tache>(`${this.endpoint}/${id}`, tache);
  }

  /**
   * Delete task
   * @param id Task ID
   * @returns Observable of operation result
   */
  deleteTask(id: number): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }

  /**
   * Get tasks by project
   * @param projectId Project ID
   * @returns Observable of Tache array
   */
  getTasksByProject(projectId: number): Observable<Tache[]> {
    return this.apiService.get<Tache[]>(`${this.endpoint}/projet/${projectId}`);
  }
}