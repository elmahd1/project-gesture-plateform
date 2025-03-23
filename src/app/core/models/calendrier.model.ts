import { Evenement } from './evenement.model';

export interface Calendrier {
  id?: number;
  evenements?: Evenement[];
}