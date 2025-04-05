import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Unauthorized - log the user out
        authService.logout();
        router.navigate(['/login']);
      } else if (error.status === 403) {
        // Forbidden - redirect to access denied page or dashboard
        router.navigate(['/access-denied']);
      }
      
      // Pass the error along
      return throwError(() => error);
    })
  );
};