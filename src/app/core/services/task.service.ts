import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://api.example.com/api/tasks'; // Remplacer par votre URL API
  
  // Données mockées pour la démo
  private mockTasks: Task[] = [
    {
      id: 1,
      title: 'Concevoir la maquette de la page d\'accueil',
      description: 'Créer des maquettes UI/UX pour la nouvelle page d\'accueil selon les spécifications du client',
      status: 'completed',
      priority: 'High',
      dueDate: new Date('2023-05-15'),
      createdAt: new Date('2023-05-01'),
      project: {
        id: 1,
        name: 'Website Redesign',
        color: '#4f46e5'
      },
      assignee: {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'manager',
        avatar: 'assets/images/user2-avatar.jpg',
        status: 'away'
      },
      labels: [
        { id: 1, name: 'Design', color: '#8b5cf6' },
        { id: 2, name: 'Frontend', color: '#ec4899' }
      ]
    },
    {
      id: 2,
      title: 'Développer la page d\'accueil responsive',
      description: 'Implémenter la page d\'accueil en HTML/CSS selon les maquettes approuvées',
      status: 'in_progress',
      priority: 'High',
      dueDate: new Date('2023-05-30'),
      createdAt: new Date('2023-05-16'),
      project: {
        id: 1,
        name: 'Website Redesign',
        color: '#4f46e5'
      },
      assignee: {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin',
        avatar: 'assets/images/user-avatar.jpg',
        status: 'online'
      },
      labels: [
        { id: 2, name: 'Frontend', color: '#ec4899' }
      ]
    },
    {
      id: 3,
      title: 'Créer des prototypes d\'applications mobiles',
      description: 'Développer des prototypes interactifs pour les fonctionnalités clés de l\'application',
      status: 'pending',
      priority: 'High',
      dueDate: new Date('2023-06-10'),
      createdAt: new Date('2023-05-20'),
      project: {
        id: 2,
        name: 'Mobile App Development',
        color: '#8b5cf6'
      },
      assignee: {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'manager',
        avatar: 'assets/images/user2-avatar.jpg',
        status: 'away'
      },
      labels: [
        { id: 1, name: 'Design', color: '#8b5cf6' },
        { id: 3, name: 'Mobile', color: '#10b981' }
      ]
    }
  ];

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    // Pour l'implémentation réelle, utiliser :
    // return this.http.get<Task[]>(this.apiUrl);
    
    // Implémentation mockée pour la démo
    return of(this.mockTasks).pipe(delay(800));
  }

  getTask(id: number): Observable<Task> {
    // Pour l'implémentation réelle, utiliser :
    // return this.http.get<Task>(`${this.apiUrl}/${id}`);
    
    // Implémentation mockée pour la démo
    const task = this.mockTasks.find(t => t.id === id);
    if (task) {
      return of(task).pipe(delay(500));
    }
    throw new Error('Tâche non trouvée');
  }

  getTasksByProject(projectId: number): Observable<Task[]> {
    // Pour l'implémentation réelle, utiliser :
    // return this.http.get<Task[]>(`${this.apiUrl}?projectId=${projectId}`);
    
    // Implémentation mockée pour la démo
    const tasks = this.mockTasks.filter(t => t.project?.id === projectId);
    return of(tasks).pipe(delay(500));
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    // Pour l'implémentation réelle, utiliser :
    // return this.http.post<Task>(this.apiUrl, task);
    
    // Implémentation mockée pour la démo
    const newTask: Task = {
      ...task,
      id: this.mockTasks.length + 1,
      createdAt: new Date()
    };
    this.mockTasks.push(newTask);
    return of(newTask).pipe(delay(800));
  }

  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    // Pour l'implémentation réelle, utiliser :
    // return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
    
    // Implémentation mockée pour la démo
    const index = this.mockTasks.findIndex(t => t.id === id);
    if (index !== -1) {
      const updatedTask = { ...this.mockTasks[index], ...task, updatedAt: new Date() };
      this.mockTasks[index] = updatedTask;
      return of(updatedTask).pipe(delay(500));
    }
    throw new Error('Tâche non trouvée');
  }

  deleteTask(id: number): Observable<void> {
    // Pour l'implémentation réelle, utiliser :
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
    
    // Implémentation mockée pour la démo
    const index = this.mockTasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.mockTasks.splice(index, 1);
      return of(undefined).pipe(delay(500));
    }
    throw new Error('Tâche non trouvée');
  }
}