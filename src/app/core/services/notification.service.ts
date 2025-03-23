import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private endpoint = 'notifications';

  constructor(private apiService: ApiService) { }

  /**
   * Get all notifications for current user
   * @returns Observable of Notification array
   */
  getUserNotifications(): Observable<Notification[]> {
    return this.apiService.get<Notification[]>(`${this.endpoint}/user`);
  }

  /**
   * Get notification by ID
   * @param id Notification ID
   * @returns Observable of Notification
   */
  getNotificationById(id: number): Observable<Notification> {
    return this.apiService.get<Notification>(`${this.endpoint}/${id}`);
  }

  /**
   * Mark notification as read
   * @param id Notification ID
   * @returns Observable of updated Notification
   */
  markAsRead(id: number): Observable<Notification> {
    return this.apiService.put<Notification>(`${this.endpoint}/${id}/read`, {});
  }

  /**
   * Mark all notifications as read
   * @returns Observable of operation result
   */
  markAllAsRead(): Observable<any> {
    return this.apiService.put<any>(`${this.endpoint}/read-all`, {});
  }

  /**
   * Delete notification
   * @param id Notification ID
   * @returns Observable of operation result
   */
  deleteNotification(id: number): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }

  /**
   * Delete all notifications
   * @returns Observable of operation result
   */
  deleteAllNotifications(): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/all`);
  }

  /**
   * Get unread notifications count
   * @returns Observable of unread count
   */
  getUnreadCount(): Observable<number> {
    return this.apiService.get<number>(`${this.endpoint}/unread-count`);
  }
}