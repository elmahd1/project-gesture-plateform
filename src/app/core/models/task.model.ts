import { User } from './user.model';
import { Project } from './project.model';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'completed' | 'pending';
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  dueDate: Date;
  createdAt: Date;
  updatedAt?: Date;
  project?: {
    id: number;
    name: string;
    color?: string;
  };
  assignee?: User;
  labels?: {
    id: number;
    name: string;
    color: string;
  }[];
}