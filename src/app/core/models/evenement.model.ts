import { TypeEvenement } from './enums';
import { Utilisateur } from './utilisateur.model';
import { Calendrier } from './calendrier.model';

export interface Evenement {
  id?: number;
  titre: string;
  description: string;
  dateDebut: Date;
  dateFin: Date;
  participants?: Utilisateur[];
  type: TypeEvenement;
  calendrier?: Calendrier;
}