// src/app/core/models/task.model.ts
import { User } from './user.model';

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assignedTo?: User;
  createdBy: User;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
  comments?: TaskComment[];
  attachments?: TaskAttachment[];
  createdAt: Date;
  updatedAt: Date;
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE'
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export interface TaskComment {
  id: string;
  content: string;
  user: User;
  createdAt: Date;
}

export interface TaskAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedBy: User;
  uploadedAt: Date;
}
