import { User } from './user.model';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'PLANNING' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';
  progress: number;
  startDate: Date;
  dueDate: Date;
  owner: User;
  members: User[];
  updatedAt?: Date;
}