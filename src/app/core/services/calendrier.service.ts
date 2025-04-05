import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Calendrier } from '../models/calendrier.model';
import { Evenement } from '../models/evenement.model';

@Injectable({
  providedIn: 'root'
})
export class CalendrierService {
  private endpoint = 'calendriers';

  constructor(private apiService: ApiService) {}

  /**
   * Get all calendars
   * @returns Observable of Calendrier array
   */
  getAllCalendriers(): Observable<Calendrier[]> {
    return this.apiService.get<Calendrier[]>(this.endpoint);
  }

  /**
   * Get calendar by ID
   * @param id Calendar ID
   * @returns Observable of Calendrier
   */
  getCalendrierById(id: number): Observable<Calendrier> {
    return this.apiService.get<Calendrier>(`${this.endpoint}/${id}`);
  }

  /**
   * Create new calendar
   * @param calendrier Calendar data
   * @returns Observable of created Calendrier
   */
  createCalendrier(calendrier: Calendrier): Observable<Calendrier> {
    return this.apiService.post<Calendrier>(this.endpoint, calendrier);
  }

  /**
   * Update existing calendar
   * @param id Calendar ID
   * @param calendrier Updated calendar data
   * @returns Observable of updated Calendrier
   */
  updateCalendrier(id: number, calendrier: Calendrier): Observable<Calendrier> {
    return this.apiService.put<Calendrier>(`${this.endpoint}/${id}`, calendrier);
  }

  /**
   * Delete calendar
   * @param id Calendar ID
   * @returns Observable of operation result
   */
  deleteCalendrier(id: number): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }

  /**
   * Get events for a specific date in a calendar
   * @param id Calendar ID
   * @param date Target date
   * @returns Observable of Evenement array
   */
  getEvenementsForDate(id: number, date: Date): Observable<Evenement[]> {
    const formattedDate = date.toISOString().split('T')[0];
    return this.apiService.get<Evenement[]>(`${this.endpoint}/${id}/evenements`, {
      date: formattedDate
    })
    .pipe(
      map(evenements => evenements.map(evenement => ({
        ...evenement,
        dateDebut: evenement.dateDebut ? new Date(evenement.dateDebut) : evenement.dateDebut,
        dateFin: evenement.dateFin ? new Date(evenement.dateFin) : evenement.dateFin
      })))
    );
  }

  /**
   * Add event to calendar
   * @param id Calendar ID
   * @param evenement Event data
   * @returns Observable of created Evenement
   */
  addEvenement(id: number, evenement: Evenement): Observable<Evenement> {
    return this.apiService.post<Evenement>(`${this.endpoint}/${id}/evenements`, evenement)
      .pipe(
        map(evenement => ({
          ...evenement,
          dateDebut: evenement.dateDebut ? new Date(evenement.dateDebut) : evenement.dateDebut,
          dateFin: evenement.dateFin ? new Date(evenement.dateFin) : evenement.dateFin
        }))
      );
  }

  /**
   * Remove event from calendar
   * @param calendrierId Calendar ID
   * @param evenementId Event ID
   * @returns Observable of operation result
   */
  removeEvenement(calendrierId: number, evenementId: number): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${calendrierId}/evenements/${evenementId}`);
  }
}