// src/app/core/services/evenement.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Evenement } from '../models/evenement.model';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  private endpoint = 'evenements';

  constructor(private apiService: ApiService) {}

  /**
   * Get all events
   * @returns Observable of Evenement array
   */
  getAllEvenements(): Observable<Evenement[]> {
    return this.apiService.get<Evenement[]>(this.endpoint)
      .pipe(
        map(evenements => this.convertDateFields(evenements))
      );
  }

  /**
   * Get event by ID
   * @param id Event ID
   * @returns Observable of Evenement
   */
  getEvenementById(id: number): Observable<Evenement> {
    return this.apiService.get<Evenement>(`${this.endpoint}/${id}`)
      .pipe(
        map(evenement => this.convertDateFields([evenement])[0])
      );
  }

  /**
   * Create new event
   * @param evenement Event data
   * @returns Observable of created Evenement
   */
  createEvenement(evenement: Evenement): Observable<Evenement> {
    return this.apiService.post<Evenement>(this.endpoint, evenement)
      .pipe(
        map(evenement => this.convertDateFields([evenement])[0])
      );
  }

  /**
   * Update existing event
   * @param id Event ID
   * @param evenement Updated event data
   * @returns Observable of updated Evenement
   */
  updateEvenement(id: number, evenement: Evenement): Observable<Evenement> {
    return this.apiService.put<Evenement>(`${this.endpoint}/${id}`, evenement)
      .pipe(
        map(evenement => this.convertDateFields([evenement])[0])
      );
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
    return this.apiService.get<Evenement[]>(`${this.endpoint}/calendrier/${calendrierId}`)
      .pipe(
        map(evenements => this.convertDateFields(evenements))
      );
  }

  /**
   * Get events for a specific date
   * @param date Target date
   * @returns Observable of Evenement array
   */
  getEvenementsByDate(date: Date): Observable<Evenement[]> {
    const formattedDate = date.toISOString().split('T')[0];
    return this.apiService.get<Evenement[]>(`${this.endpoint}/date`, {
      date: formattedDate
    })
    .pipe(
      map(evenements => this.convertDateFields(evenements))
    );
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

  /**
   * Helper method to convert string dates to Date objects
   */
  private convertDateFields(evenements: Evenement[]): Evenement[] {
    return evenements.map(evenement => ({
      ...evenement,
      dateDebut: evenement.dateDebut ? new Date(evenement.dateDebut) : evenement.dateDebut,
      dateFin: evenement.dateFin ? new Date(evenement.dateFin) : evenement.dateFin
    }));
  }
}