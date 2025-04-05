import { TypeEvenement } from './enums';
import { Utilisateur } from './utilisateur.model';
import { Calendrier } from './calendrier.model';

export interface Evenement {
  id?: number;
  titre: string;
  description: string;
  dateDebut: Date | string;
  dateFin: Date | string;
  participants?: Utilisateur[];
  type: TypeEvenement;
  calendrier?: Calendrier;
}