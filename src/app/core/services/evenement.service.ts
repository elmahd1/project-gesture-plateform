import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Evenement } from '../models/evenement.model';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  private endpoint = 'evenements';

  constructor(private apiService: ApiService) { }

  /**
   * Get all events
   * @returns Observable of Evenement array
   */
  getAllEvenements(): Observable<Evenement[]> {
    return this.apiService.get<Evenement[]>(this.endpoint);
  }

  /**
   * Get event by ID
   * @param id Event ID
   * @returns Observable of Evenement
   */
  getEvenementById(id: number): Observable<Evenement> {
    return this.apiService.get<Evenement>(`${this.endpoint}/${id}`);
  }

  /**
   * Create new event
   * @param evenement Event data
   * @returns Observable of created Evenement
   */
  createEvenement(evenement: Evenement): Observable<Evenement> {
    return this.apiService.post<Evenement>(this.endpoint, evenement);
  }

  /**
   * Update existing event
   * @param id Event ID
   * @param evenement Updated event data
   * @returns Observable of updated Evenement
   */
  updateEvenement(id: number, evenement: Evenement): Observable<Evenement> {
    return this.apiService.put<Evenement>(`${this.endpoint}/${id}`, evenement);
  }

  /**
   * Delete event
   * @param id Event ID
   * @returns Observable of operation result
   */
  deleteEvenement(id: number): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }

  /**
   * Get events by calendar
   * @param calendrierId Calendar ID
   * @returns Observable of Evenement array
   */
  getEvenementsByCalendrier(calendrierId: number): Observable<Evenement[]> {
    return this.apiService.get<Evenement[]>(`${this.endpoint}/calendrier/${calendrierId}`);
  }

  /**
   * Get events for a specific date
   * @param date Target date
   * @returns Observable of Evenement array
   */
  getEvenementsByDate(date: Date): Observable<Evenement[]> {
    return this.apiService.get<Evenement[]>(`${this.endpoint}/date`, {
      date: date.toISOString().split('T')[0]
    });
  }

  /**
   * Add participant to event
   * @param evenementId Event ID
   * @param utilisateurId User ID
   * @returns Observable of operation result
   */
  addParticipant(evenementId: number, utilisateurId: number): Observable<any> {
    return this.apiService.post<any>(`${this.endpoint}/${evenementId}/participants/${utilisateurId}`, {});
  }

  /**
   * Remove participant from event
   * @param evenementId Event ID
   * @param utilisateurId User ID
   * @returns Observable of operation result
   */
  removeParticipant(evenementId: number, utilisateurId: number): Observable<any> {
    return this.apiService.delete<any>(`${this.endpoint}/${evenementId}/participants/${utilisateurId}`);
  }
}