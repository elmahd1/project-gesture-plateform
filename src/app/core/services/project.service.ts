import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Project } from '../models/project.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'https://api.example.com/api/projects'; // Replace with your actual API URL

  // Mocked projects data for demo
  private mockProjects: Project[] = [
    {
      id: 1,
      name: 'Refonte du site web',
      description: 'Refonte complète du site web de l\'entreprise avec un design moderne et responsive.',
      status: 'IN_PROGRESS',
      progress: 65,
      startDate: new Date('2023-01-15'),
      dueDate: new Date('2023-04-30'),
      owner: {
        id: 1,
        name: 'Jean Dupont',
        email: 'jean.dupont@example.com',
        role: 'admin',
        avatar: 'assets/images/user-avatar.jpg'
      },
      members: [
        {
          id: 1,
          name: 'Jean Dupont',
          email: 'jean.dupont@example.com',
          role: 'admin',
          avatar: 'assets/images/user-avatar.jpg'
        },
        {
          id: 2,
          name: 'Marie Martin',
          email: 'marie.martin@example.com',
          role: 'manager',
          avatar: 'assets/images/user2-avatar.jpg'
        }
      ]
    },
    // Add more mock projects as needed
  ];

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    // For actual implementation, use:
    // return this.http.get<Project[]>(this.apiUrl);
    
    // Mocked implementation for demo
    return of(this.mockProjects).pipe(delay(800));
  }

  getProject(id: number): Observable<Project> {
    // For actual implementation, use:
    // return this.http.get<Project>(`${this.apiUrl}/${id}`);
    
    // Mocked implementation for demo
    const project = this.mockProjects.find(p => p.id === id);
    if (project) {
      return of(project).pipe(delay(500));
    }
    throw new Error('Projet non trouvé');
  }

  createProject(project: Omit<Project, 'id'>): Observable<Project> {
    // For actual implementation, use:
    // return this.http.post<Project>(this.apiUrl, project);
    
    // Mocked implementation for demo
    const newProject: Project = {
      ...project,
      id: this.mockProjects.length + 1,
      progress: 0,
      startDate: new Date(),
      members: project.members || []
    };
    this.mockProjects.push(newProject);
    return of(newProject).pipe(delay(800));
  }

  updateProject(id: number, project: Partial<Project>): Observable<Project> {
    // For actual implementation, use:
    // return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
    
    // Mocked implementation for demo
    const index = this.mockProjects.findIndex(p => p.id === id);
    if (index !== -1) {
      const updatedProject = { 
        ...this.mockProjects[index], 
        ...project,
        updatedAt: new Date() 
      };
      this.mockProjects[index] = updatedProject;
      return of(updatedProject).pipe(delay(500));
    }
    throw new Error('Projet non trouvé');
  }

  deleteProject(id: number): Observable<void> {
    // For actual implementation, use:
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
    
    // Mocked implementation for demo
    const index = this.mockProjects.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockProjects.splice(index, 1);
      return of(undefined).pipe(delay(500));
    }
    throw new Error('Projet non trouvé');
  }
}