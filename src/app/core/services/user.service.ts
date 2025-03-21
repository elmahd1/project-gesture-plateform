import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.example.com/api/users'; // Remplacer par votre URL API
  
  // Données mockées pour la démo
  private mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
      avatar: 'assets/images/user-avatar.jpg',
      status: 'online'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'manager',
      avatar: 'assets/images/user2-avatar.jpg',
      status: 'away'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'user',
      avatar: 'assets/images/user3-avatar.jpg',
      status: 'offline'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      role: 'user',
      avatar: 'assets/images/user4-avatar.jpg',
      status: 'busy'
    }
  ];

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    // Pour l'implémentation réelle, utiliser :
    // return this.http.get<User[]>(this.apiUrl);
    
    // Implémentation mockée pour la démo
    return of(this.mockUsers).pipe(delay(800));
  }

  getUser(id: number): Observable<User> {
    // Pour l'implémentation réelle, utiliser :
    // return this.http.get<User>(`${this.apiUrl}/${id}`);
    
    // Implémentation mockée pour la démo
    const user = this.mockUsers.find(u => u.id === id);
    if (user) {
      return of(user).pipe(delay(500));
    }
    throw new Error('Utilisateur non trouvé');
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    // Pour l'implémentation réelle, utiliser :
    // return this.http.put<User>(`${this.apiUrl}/${id}`, user);
    
    // Implémentation mockée pour la démo
    const index = this.mockUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      const updatedUser = { ...this.mockUsers[index], ...user };
      this.mockUsers[index] = updatedUser;
      return of(updatedUser).pipe(delay(500));
    }
    throw new Error('Utilisateur non trouvé');
  }
}