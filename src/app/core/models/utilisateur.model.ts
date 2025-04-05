import { Role } from './enums';
import { Tache } from './tache.model';
import { Notification } from './notification.model';

export interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  role: Role;
  tachesAssignees?: Tache[];
  notifications?: Notification[];
  
  // For UI purposes
  avatar?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}