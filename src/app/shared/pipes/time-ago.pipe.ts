import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return '';
    
    const date = new Date(value);
    const now = new Date();
    const seconds = Math.round(Math.abs((now.getTime() - date.getTime()) / 1000));
    
    // Unités de temps en secondes
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;
    
    if (seconds < 30) {
      return 'à l\'instant';
    } else if (seconds < minute) {
      return `il y a ${seconds} secondes`;
    } else if (seconds < hour) {
      const minutes = Math.floor(seconds / minute);
      return `il y a ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    } else if (seconds < day) {
      const hours = Math.floor(seconds / hour);
      return `il y a ${hours} ${hours === 1 ? 'heure' : 'heures'}`;
    } else if (seconds < week) {
      const days = Math.floor(seconds / day);
      return `il y a ${days} ${days === 1 ? 'jour' : 'jours'}`;
    } else if (seconds < month) {
      const weeks = Math.floor(seconds / week);
      return `il y a ${weeks} ${weeks === 1 ? 'semaine' : 'semaines'}`;
    } else if (seconds < year) {
      const months = Math.floor(seconds / month);
      return `il y a ${months} ${months === 1 ? 'mois' : 'mois'}`;
    } else {
      const years = Math.floor(seconds / year);
      return `il y a ${years} ${years === 1 ? 'an' : 'ans'}`;
    }
  }
}