import { Utilisateur } from './utilisateur.model';
import { Projet } from './projet.model';
// import { Ressource } from './ressource.model';
import { Commentaire } from './commentaire.model';

export interface Tache {
  id: number;
  titre: string;
  description: string;
  priorite: 'FAIBLE' | 'MOYENNE' | 'ELEVEE' | 'URGENTE';
  statut: 'A_FAIRE' | 'EN_COURS' | 'TERMINE';
  dateDebut: Date;
  dateFin: Date;
  progression: number;
  assignes: Utilisateur[];
  commentaires: Commentaire[];
  // ressources: Ressource[];
  projet: Projet;
  cout: number;
  
  // For compatibility with existing code
  status?: 'A_FAIRE' | 'EN_COURS' | 'TERMINE' | 'pending';
  datefin?: Date;
  assignee?: Utilisateur;
}