import { TypeNotification } from './enums';
import { Utilisateur } from './utilisateur.model';

export interface Notification {
  id?: number;
  message: string;
  dateCreation: Date | string;
  lue: boolean;
  type: TypeNotification;
  referenceId: number;
  referenceType: string;
  utilisateur?: Utilisateur;
}