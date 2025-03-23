import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        // Unauthorized - redirect to login
        localStorage.removeItem('auth_token');
        router.navigate(['/auth/login']);
      }
      
      const errorMessage = error.error?.message || error.statusText || 'Unknown error';
      console.error('API Error:', errorMessage);
      
      return throwError(() => new Error(errorMessage));
    })
  );
};