import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}

@Component({
  selector: 'app-calendrier-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="calendar-container">
      <div class="calendar-header">
        <h1>Calendrier</h1>
        <div class="calendar-actions">
          <button routerLink="/calendrier/event/new" class="btn btn-primary">
            Nouvel Événement
          </button>
        </div>
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
              {{ day.date }}
              <div class="events">
                <div 
                  *ngFor="let event of getEventsForDay(day.fullDate)" 
                  class="event">
                  {{ event.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .calendar-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .month-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .calendar-grid {
      border: 1px solid #ddd;
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
      text-align: center;
      position: relative;
    }

    .calendar-day.current-month {
      background-color: white;
    }

    .calendar-day.today {
      background-color: #e6f3ff;
    }

    .events {
      margin-top: 5px;
    }

    .event {
      background-color: #4f46e5;
      color: white;
      padding: 2px;
      margin: 2px 0;
      border-radius: 3px;
      font-size: 0.7rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `]
})
export class CalendrierViewComponent implements OnInit {
  currentDate = new Date();
  currentMonthName: string;
  currentYear: number;
  calendarDays: any[] = [];
  events: CalendarEvent[] = [
    {
      id: 1,
      title: 'Réunion Projet',
      start: new Date(2024, 2, 15, 10, 0),
      end: new Date(2024, 2, 15, 11, 0),
      description: 'Réunion de suivi du projet principal'
    }
  ];

  constructor() {
    this.currentMonthName = this.currentDate.toLocaleString('fr-FR', { month: 'long' });
    this.currentYear = this.currentDate.getFullYear();
  }

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    
    // Find the first day of the week for the first day of the month
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

  getEventsForDay(date: Date): CalendarEvent[] {
    return this.events.filter(event => 
      event.start.getDate() === date.getDate() &&
      event.start.getMonth() === date.getMonth() &&
      event.start.getFullYear() === date.getFullYear()
    );
  }
}