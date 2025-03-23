// Enums matching the backend
export enum Priorite {
  FAIBLE = 'FAIBLE',
  MOYENNE = 'MOYENNE',
  ELEVEE = 'ELEVEE',
  URGENTE = 'URGENTE'
}

export enum Statut {
  A_FAIRE = 'A_FAIRE',
  EN_COURS = 'EN_COURS',
  TERMINE = 'TERMINE',
  EN_PAUSE = 'EN_PAUSE',
  ANNULE = 'ANNULE'
}

export enum Role {
  ADMIN = 'ADMIN',
  CHEF_PROJET = 'CHEF_PROJET',
  MEMBRE = 'MEMBRE'
}

export enum TypeRessource {
  HUMAINE = 'HUMAINE',
  MATERIELLE = 'MATERIELLE',
  FINANCIERE = 'FINANCIERE',
  LOGICIELLE = 'LOGICIELLE'
}

export enum FormatRapport {
  PDF = 'PDF',
  EXCEL = 'EXCEL',
  HTML = 'HTML',
  JSON = 'JSON'
}

export enum TypeDocument {
  SPECIFICATION = 'SPECIFICATION',
  COMPTE_RENDU = 'COMPTE_RENDU',
  PLAN = 'PLAN',
  CONTRAT = 'CONTRAT',
  AUTRE = 'AUTRE'
}

export enum TypeEvenement {
  REUNION = 'REUNION',
  JALON = 'JALON',
  ECHEANCE = 'ECHEANCE',
  AUTRE = 'AUTRE'
}

export enum TypeNotification {
  TACHE_ASSIGNEE = 'TACHE_ASSIGNEE',
  ECHEANCE_PROCHE = 'ECHEANCE_PROCHE',
  COMMENTAIRE = 'COMMENTAIRE',
  MODIFICATION_PROJET = 'MODIFICATION_PROJET',
  NOUVEAU_DOCUMENT = 'NOUVEAU_DOCUMENT'
}

export enum NiveauImpact {
  FAIBLE = 'FAIBLE',
  MOYEN = 'MOYEN',
  ELEVE = 'ELEVE',
  CRITIQUE = 'CRITIQUE'
}