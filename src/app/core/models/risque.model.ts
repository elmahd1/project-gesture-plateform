import { NiveauImpact, Statut } from './enums';
import { Utilisateur } from './utilisateur.model';
import { Projet } from './projet.model';

export interface Risque {
  id?: number;
  description: string;
  impact: NiveauImpact;
  probabilite: number;
  strategie: string;
  statut: Statut;
  responsable?: Utilisateur;
  projet?: Projet;
}