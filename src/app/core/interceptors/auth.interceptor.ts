import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // Get the auth token from local storage - use consistent key
  const authToken = localStorage.getItem('authToken');

  // Clone the request and add the authorization header
  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });

    // Send the cloned request
    return next(authReq).pipe(
      catchError((error) => {
        // Handle different types of authentication errors
        if (error.status === 401) {
          // Unauthorized - token might be expired or invalid
          handleUnauthorizedError(router);
        } else if (error.status === 403) {
          // Forbidden - user doesn't have permission
          handleForbiddenError(router);
        }

        // Rethrow the error
        return throwError(() => error);
      })
    );
  }

  // If no token, proceed with the original request
  return next(req);
};

function handleUnauthorizedError(router: Router) {
  // Clear any stored authentication data
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');

  // Redirect to login page
  router.navigate(['/auth/login'], {
    queryParams: {
      message: 'Votre session a expiré. Veuillez vous reconnecter.'
    }
  });
}

function handleForbiddenError(router: Router) {
  // Redirect to a permission denied or home page
  router.navigate(['/dashboard'], {
    queryParams: {
      message: 'Vous n\'avez pas la permission d\'accéder à cette ressource.'
    }
  });
}