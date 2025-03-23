import { Utilisateur } from './utilisateur.model';
import { Tache } from './tache.model';

export interface Commentaire {
  id?: number;
  contenu: string;
  dateCreation: Date;
  auteur: Utilisateur;
  tache?: Tache;
}