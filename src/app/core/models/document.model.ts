import { TypeDocument } from './enums';
import { Utilisateur } from './utilisateur.model';
import { Projet } from './projet.model';

export interface Document {
  id?: number;
  nom: string;
  cheminFichier: string;
  dateCreation: Date;
  dateDerniereModification: Date;
  createur: Utilisateur;
  type: TypeDocument;
  projet?: Projet;
}