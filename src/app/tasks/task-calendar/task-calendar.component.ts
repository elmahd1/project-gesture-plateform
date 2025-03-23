import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TacheService } from '../../core/services/tache.service';
import { Tache } from '../../core/models/tache.model';

@Component({
  selector: 'app-task-calendar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="task-calendar-container">
      <div class="calendar-header">
        <h1>Calendrier des Tâches</h1>
        <button routerLink="/tasks/new" class="btn-add-task">
          Nouvelle Tâche
        </button>
      </div>

      <div class="calendar-view">
        <div class="month-header">
          <button (click)="previousMonth()">&lt;</button>
          <h2>{{ currentMonthName }} {{ currentYear }}</h2>
          <button (click)="nextMonth()">&gt;</button>
        </div>

        <div class="calendar-grid">
          <div class="weekdays">
            <div>Lun</div>
            <div>Mar</div>
            <div>Mer</div>
            <div>Jeu</div>
            <div>Ven</div>
            <div>Sam</div>
            <div>Dim</div>
          </div>

          <div class="calendar-days">
            <div 
              *ngFor="let day of calendarDays" 
              class="calendar-day"
              [ngClass]="{
                'current-month': day.isCurrentMonth,
                'today': day.isToday
              }">
              <div class="day-number">{{ day.date }}</div>
              <div class="day-tasks">
                <div 
                  *ngFor="let task of getTasksForDay(day.fullDate)" 
                  class="task-event"
                  [ngClass]="getTaskStatusClass(task.statut)">
                  {{ task.titre }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .task-calendar-container {
      padding: 20px;
      background-color: #f4f5f7;
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .btn-add-task {
      background-color: #4f46e5;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
    }

    .month-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .calendar-grid {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      background-color: #f0f0f0;
      text-align: center;
      font-weight: bold;
      padding: 10px 0;
    }

    .calendar-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      min-height: 500px;
    }

    .calendar-day {
      border: 1px solid #eee;
      padding: 10px;
      position: relative;
    }

    .day-number {
      text-align: right;
      color: #888;
      margin-bottom: 5px;
    }

    .current-month .day-number {
      color: #333;
    }

    .today .day-number {
      background-color: #4f46e5;
      color: white;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .task-event {
      margin: 2px 0;
      padding: 3px;
      border-radius: 3px;
      font-size: 0.7rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .task-event.a-faire { background-color: #fef3c7; color: #92400e; }
    .task-event.en-cours { background-color: #e0f2fe; color: #0369a1; }
    .task-event.termine { background-color: #d1fae5; color: #065f46; }
  `]
})
export class TaskCalendarComponent implements OnInit {
  currentDate = new Date();
  currentMonthName: string;
  currentYear: number;
  calendarDays: any[] = [];
  tasks: Tache[] = [];

  constructor(private tacheService: TacheService) {
    this.currentMonthName = this.currentDate.toLocaleString('fr-FR', { month: 'long' });
    this.currentYear = this.currentDate.getFullYear();
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tacheService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.generateCalendar();
      },
      error: (error) => {
        console.error('Erreur de chargement des tâches', error);
      }
    });
  }

  generateCalendar(): void {
    const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    
    const startingDay = firstDayOfMonth.getDay() || 7;
    
    this.calendarDays = [];
    
    // Previous month's days
    for (let i = 1; i < startingDay; i++) {
      const prevMonthDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), -startingDay + i + 1);
      this.calendarDays.push({
        date: prevMonthDate.getDate(),
        isCurrentMonth: false,
        fullDate: prevMonthDate
      });
    }
    
    // Current month's days
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i);
      this.calendarDays.push({
        date: i,
        isCurrentMonth: true,
        isToday: this.isToday(date),
        fullDate: date
      });
    }
    
    // Next month's days to fill the grid
    const remainingCells = 42 - this.calendarDays.length;
    for (let i = 1; i <= remainingCells; i++) {
      const nextMonthDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, i);
      this.calendarDays.push({
        date: i,
        isCurrentMonth: false,
        fullDate: nextMonthDate
      });
    }
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  previousMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.updateMonthDetails();
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.updateMonthDetails();
  }

  private updateMonthDetails(): void {
    this.currentMonthName = this.currentDate.toLocaleString('fr-FR', { month: 'long' });
    this.currentYear = this.currentDate.getFullYear();
    this.generateCalendar();
  }

  getTasksForDay(date: Date): Tache[] {
    return this.tasks.filter(task => {
      const taskDate = new Date(task.dateFin);
      return taskDate.getDate() === date.getDate() &&
             taskDate.getMonth() === date.getMonth() &&
             taskDate.getFullYear() === date.getFullYear();
    });
  }

  getTaskStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'A_FAIRE': 'a-faire',
      'EN_COURS': 'en-cours',
      'TERMINE': 'termine'
    };
    return statusClasses[status] || '';
  }
}