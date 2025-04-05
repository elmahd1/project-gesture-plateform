import { Statut } from './enums';
import { Tache } from './tache.model';
import { Utilisateur } from './utilisateur.model';
import { Document } from './document.model';
import { Risque } from './risque.model';

export interface Projet {
  id?: number;
  nom: string;
  description: string;
  dateDebut: Date | string;
  dateFin: Date | string;
  statut: Statut;
  taches?: Tache[];
  membres?: Utilisateur[];
  documents?: Document[];
  risques?: Risque[];
  
  // For UI purposes and backward compatibility
  status?: string;
  progress?: number;
  progression?: number;
  createdById?: number;
  updatedAt?: Date | string;
  owner?: Utilisateur;
  startDate?: Date | string;
  dueDate?: Date | string;
}