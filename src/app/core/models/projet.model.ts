import { Utilisateur } from './utilisateur.model';
import { Tache } from './tache.model';
// import { Ressource } from './ressource.model';
import { Document } from './document.model';
import { Risque } from './risque.model';

export interface Projet {
  id: number;
  nom: string;
  description: string;
  dateDebut: Date;
  dateFin: Date;
  statut: 'PLANNING' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';
  taches: Tache[];
  membres: Utilisateur[];
  // ressources: Ressource[];
  documents: Document[];
  risques: Risque[];
  
  // For compatibility with existing code
  status?: 'PLANNING' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';
  progress?: number;
  startDate?: Date;
  dueDate?: Date;
  owner?: Utilisateur;
  updatedAt?: Date;
}