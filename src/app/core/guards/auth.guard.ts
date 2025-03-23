import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, CanActivate, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): 
    | boolean 
    | UrlTree 
    | Observable<boolean | UrlTree> 
    | Promise<boolean | UrlTree> {
    // Only check authentication in browser environment
    if (isPlatformBrowser(this.platformId)) {
      if (this.authService.isAuthenticated()) {
        return true;
      }

      // Redirect to login page
      return this.router.createUrlTree(['/auth/login']);
    }

    // Allow server-side rendering to proceed
    return true;
  }
}