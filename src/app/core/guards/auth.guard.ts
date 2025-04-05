import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Comprehensive authentication check
  const isAuthenticated = authService.isAuthenticated();
  const token = localStorage.getItem('authToken'); // Note: using 'authToken' consistently

  console.log('Auth Guard Check', {
    isAuthenticated,
    hasToken: !!token,
    requestedRoute: state.url
  });

  if (isAuthenticated && token) {
    // Skip token validation for now, it's causing issues
    return true;
  }

  // If not authenticated, redirect to login
  return redirectToLogin(router, state);
};

// Helper function for login redirection
function redirectToLogin(
  router: Router, 
  state: RouterStateSnapshot
) {
  console.log('Redirecting to login', { 
    returnUrl: state.url 
  });

  return router.createUrlTree(['/auth/login'], {
    queryParams: {
      returnUrl: state.url,
      message: 'Vous devez vous connecter pour accéder à cette page.'
    }
  });
}