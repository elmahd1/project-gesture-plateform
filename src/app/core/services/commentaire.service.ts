import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Commentaire } from '../models/commentaire.model';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  private endpoint = 'commentaires';

  constructor(private apiService: ApiService) {}

  /**
   * Get all comments
   * @returns Observable of Commentaire array
   */
  getAllCommentaires(): Observable<Commentaire[]> {
    return this.apiService.get<Commentaire[]>(this.endpoint)
      .pipe(
        map(commentaires => this.convertDateFields(commentaires))
      );
  }

  /**
   * Get comment by ID
   * @param id Comment ID
   * @returns Observable of Commentaire
   */
  getCommentaireById(id: number): Observable<Commentaire> {
    return this.apiService.get<Commentaire>(`${this.endpoint}/${id}`)
      .pipe(
        map(commentaire => this.convertDateFields([commentaire])[0])
      );
  }

  /**
   * Create new comment
   * @param commentaire Comment data
   * @returns Observable of created Commentaire
   */
  createCommentaire(commentaire: Commentaire): Observable<Commentaire> {
    return this.apiService.post<Commentaire>(this.endpoint, commentaire)
      .pipe(
        map(commentaire => this.convertDateFields([commentaire])[0])
      );
  }

  /**
   * Update existing comment
   * @param id Comment ID
   * @param commentaire Updated comment data
   * @returns Observable of updated Commentaire
   */
  updateCommentaire(id: number, commentaire: Commentaire): Observable<Commentaire> {
    return this.apiService.put<Commentaire>(`${this.endpoint}/${id}`, commentaire)
      .pipe(
        map(commentaire => this.convertDateFields([commentaire])[0])
      );
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
    return this.apiService.get<Commentaire[]>(`${this.endpoint}/tache/${tacheId}`)
      .pipe(
        map(commentaires => this.convertDateFields(commentaires))
      );
  }

  /**
   * Get comments by user
   * @param utilisateurId User ID
   * @returns Observable of Commentaire array
   */
  getCommentairesByUtilisateur(utilisateurId: number): Observable<Commentaire[]> {
    return this.apiService.get<Commentaire[]>(`${this.endpoint}/utilisateur/${utilisateurId}`)
      .pipe(
        map(commentaires => this.convertDateFields(commentaires))
      );
  }

  /**
   * Add comment to task
   * @param tacheId Task ID
   * @param contenu Comment content
   * @returns Observable of created Commentaire
   */
  addCommentToTask(tacheId: number, contenu: string): Observable<Commentaire> {
    return this.apiService.post<Commentaire>(`taches/${tacheId}/commentaires`, { contenu })
      .pipe(
        map(commentaire => this.convertDateFields([commentaire])[0])
      );
  }

  /**
   * Helper method to convert string dates to Date objects
   */
  private convertDateFields(commentaires: Commentaire[]): Commentaire[] {
    return commentaires.map(commentaire => ({
      ...commentaire,
      dateCreation: commentaire.dateCreation ? new Date(commentaire.dateCreation) : commentaire.dateCreation
    }));
  }
}