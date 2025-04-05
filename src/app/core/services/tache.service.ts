import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Tache } from '../models/tache.model';
import { Commentaire } from '../models/commentaire.model';

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
    return this.apiService.get<Tache[]>(this.endpoint)
      .pipe(
        map(taches => this.convertDateFields(taches))
      );
  }

  /**
   * Get task by ID
   * @param id Task ID
   * @returns Observable of Tache
   */
  getTaskById(id: number): Observable<Tache> {
    return this.apiService.get<Tache>(`${this.endpoint}/${id}`)
      .pipe(
        map(tache => this.convertDateFields([tache])[0])
      );
  }

  /**
   * Create new task
   * @param tache Task data
   * @returns Observable of created Tache
   */
  createTask(tache: Tache): Observable<Tache> {
    return this.apiService.post<Tache>(this.endpoint, tache)
      .pipe(
        map(tache => this.convertDateFields([tache])[0])
      );
  }

  /**
   * Update existing task
   * @param id Task ID
   * @param tache Updated task data
   * @returns Observable of updated Tache
   */
  updateTask(id: number, tache: Partial<Tache>): Observable<Tache> {
    return this.apiService.put<Tache>(`${this.endpoint}/${id}`, tache)
      .pipe(
        map(tache => this.convertDateFields([tache])[0])
      );
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
    return this.apiService.get<Tache[]>(`${this.endpoint}`, { projetId: projectId })
      .pipe(
        map(taches => this.convertDateFields(taches))
      );
  }

  /**
   * Get tasks assigned to a user
   * @param userId User ID
   * @returns Observable of Tache array
   */
  getTasksByUser(userId: number): Observable<Tache[]> {
    return this.apiService.get<Tache[]>(`${this.endpoint}`, { utilisateurId: userId })
      .pipe(
        map(taches => this.convertDateFields(taches))
      );
  }

  /**
   * Update task status
   * @param id Task ID
   * @param status New status
   * @returns Observable of updated Tache
   */
  updateTaskStatus(id: number, status: string): Observable<Tache> {
    return this.apiService.put<Tache>(`${this.endpoint}/${id}`, { statut: status })
      .pipe(
        map(tache => this.convertDateFields([tache])[0])
      );
  }

  /**
   * Assign task to user
   * @param taskId Task ID
   * @param userId User ID
   * @returns Observable of updated Tache
   */
  assignTask(taskId: number, userId: number): Observable<Tache> {
    return this.apiService.post<Tache>(`${this.endpoint}/${taskId}/assign`, { utilisateurId: userId })
      .pipe(
        map(tache => this.convertDateFields([tache])[0])
      );
  }

  /**
   * Get task comments
   * @param taskId Task ID
   * @returns Observable of Commentaire array
   */
  getTaskComments(taskId: number): Observable<Commentaire[]> {
    return this.apiService.get<Commentaire[]>(`commentaires`, { tacheId: taskId })
      .pipe(
        map(commentaires => commentaires.map(commentaire => ({
          ...commentaire,
          dateCreation: commentaire.dateCreation ? new Date(commentaire.dateCreation) : commentaire.dateCreation
        })))
      );
  }

  /**
   * Add comment to task
   * @param taskId Task ID
   * @param comment Comment text
   * @param authorId Author's user ID
   * @returns Observable of operation result
   */
  addComment(taskId: number, comment: string, authorId: number): Observable<Commentaire> {
    return this.apiService.post<Commentaire>('commentaires', {
      contenu: comment,
      tache: { id: taskId },
      auteur: { id: authorId },
      dateCreation: new Date()
    })
    .pipe(
      map(commentaire => ({
        ...commentaire,
        dateCreation: commentaire.dateCreation ? new Date(commentaire.dateCreation) : commentaire.dateCreation
      }))
    );
  }

  /**
   * Helper method to convert string dates to Date objects and ensure backward compatibility
   */
  private convertDateFields(taches: Tache[]): Tache[] {
    return taches.map(tache => ({
      ...tache,
      dateDebut: tache.dateDebut ? new Date(tache.dateDebut) : tache.dateDebut,
      dateFin: tache.dateFin ? new Date(tache.dateFin) : tache.dateFin,
      // Ensure backward compatibility
      datefin: tache.dateFin,
      status: tache.statut
    }));
  }
}