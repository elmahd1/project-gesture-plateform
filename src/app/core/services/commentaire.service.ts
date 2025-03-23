import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Commentaire } from '../models/commentaire.model';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  private endpoint = 'commentaires';

  constructor(private apiService: ApiService) { }

  /**
   * Get all comments
   * @returns Observable of Commentaire array
   */
  getAllCommentaires(): Observable<Commentaire[]> {
    return this.apiService.get<Commentaire[]>(this.endpoint);
  }

  /**
   * Get comment by ID
   * @param id Comment ID
   * @returns Observable of Commentaire
   */
  getCommentaireById(id: number): Observable<Commentaire> {
    return this.apiService.get<Commentaire>(`${this.endpoint}/${id}`);
  }

  /**
   * Create new comment
   * @param commentaire Comment data
   * @returns Observable of created Commentaire
   */
  createCommentaire(commentaire: Commentaire): Observable<Commentaire> {
    return this.apiService.post<Commentaire>(this.endpoint, commentaire);
  }

  /**
   * Update existing comment
   * @param id Comment ID
   * @param commentaire Updated comment data
   * @returns Observable of updated Commentaire
   */
  updateCommentaire(id: number, commentaire: Commentaire): Observable<Commentaire> {
    return this.apiService.put<Commentaire>(`${this.endpoint}/${id}`, commentaire);
  }

  /**
   * Delete comment
   * @param id Comment ID
   * @returns Observable of operation result
   */
  deleteCommentaire(id: number): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }

  /**
   * Get comments by task
   * @param tacheId Task ID
   * @returns Observable of Commentaire array
   */
  getCommentairesByTache(tacheId: number): Observable<Commentaire[]> {
    return this.apiService.get<Commentaire[]>(`${this.endpoint}/tache/${tacheId}`);
  }

  /**
   * Get comments by user
   * @param utilisateurId User ID
   * @returns Observable of Commentaire array
   */
  getCommentairesByUtilisateur(utilisateurId: number): Observable<Commentaire[]> {
    return this.apiService.get<Commentaire[]>(`${this.endpoint}/utilisateur/${utilisateurId}`);
  }

  /**
   * Add comment to task
   * @param tacheId Task ID
   * @param contenu Comment content
   * @returns Observable of created Commentaire
   */
  addCommentToTask(tacheId: number, contenu: string): Observable<Commentaire> {
    return this.apiService.post<Commentaire>(`taches/${tacheId}/commentaires`, { contenu });
  }
}