export interface Utilisateur {
  id: number;
  nom: string; // Changed from 'name' to 'nom' to match the backend
  prenom: string; // Added this property to match the backend
  email: string;
  role: string;
  avatar?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}