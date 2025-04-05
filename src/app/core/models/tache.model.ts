import { Priorite, Statut } from './enums';
import { Utilisateur } from './utilisateur.model';
import { Commentaire } from './commentaire.model';
import { Projet } from './projet.model';

export interface Tache {
  id?: number;
  titre: string;
  description: string;
  priorite: Priorite;
  statut: Statut;
  dateDebut: Date | string;
  dateFin: Date | string;
  progression: number;
  assignes?: Utilisateur[];
  commentaires?: Commentaire[];
  projet?: Projet;
  cout: number;
  
  // For UI purposes and backward compatibility
  status?: string;
  datefin?: Date | string; // For backward compatibility
  assignee?: Utilisateur; // Simplified assignment for UI
}