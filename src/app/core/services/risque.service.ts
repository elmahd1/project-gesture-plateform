import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Risque } from '../models/risque.model';
import { NiveauImpact, Statut } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class RisqueService {
  private endpoint = 'risques';

  constructor(private apiService: ApiService) {}

  /**
   * Get all risks
   * @returns Observable of Risque array
   */
  getAllRisques(): Observable<Risque[]> {
    return this.apiService.get<Risque[]>(this.endpoint);
  }

  /**
   * Get risk by ID
   * @param id Risk ID
   * @returns Observable of Risque
   */
  getRisqueById(id: number): Observable<Risque> {
    return this.apiService.get<Risque>(`${this.endpoint}/${id}`);
  }

  /**
   * Create new risk
   * @param risque Risk data
   * @returns Observable of created Risque
   */
  createRisque(risque: Risque): Observable<Risque> {
    return this.apiService.post<Risque>(this.endpoint, risque);
  }

  /**
   * Update existing risk
   * @param id Risk ID
   * @param risque Updated risk data
   * @returns Observable of updated Risque
   */
  updateRisque(id: number, risque: Risque): Observable<Risque> {
    return this.apiService.put<Risque>(`${this.endpoint}/${id}`, risque);
  }

  /**
   * Delete risk
   * @param id Risk ID
   * @returns Observable of operation result
   */
  deleteRisque(id: number): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }

  /**
   * Update risk status
   * @param id Risk ID
   * @param statut New status
   * @returns Observable of updated Risque
   */
  updateRisqueStatus(id: number, statut: Statut): Observable<Risque> {
    return this.apiService.put<Risque>(`${this.endpoint}/${id}/statut`, { statut });
  }

  /**
   * Get risks by project
   * @param projetId Project ID
   * @returns Observable of Risque array
   */
  getRisquesByProjet(projetId: number): Observable<Risque[]> {
    return this.apiService.get<Risque[]>(`${this.endpoint}/projet/${projetId}`);
  }

  /**
   * Calculate risk score
   * @param risque Risk data
   * @returns Risk score
   */
  calculateScore(risque: Risque): number {
    // This is a frontend calculation that mimics the backend calculation
    const impactValues: Record<NiveauImpact, number> = {
      [NiveauImpact.FAIBLE]: 0.25,
      [NiveauImpact.MOYEN]: 0.5,
      [NiveauImpact.ELEVE]: 0.75,
      [NiveauImpact.CRITIQUE]: 1
    };
    
    return impactValues[risque.impact] * risque.probabilite;
  }
}