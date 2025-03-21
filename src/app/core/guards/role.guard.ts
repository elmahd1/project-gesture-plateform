import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Vérifier si l'utilisateur est authentifié
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    // Vérifier si la route a des données de rôles requis
    const requiredRoles = route.data['roles'] as Array<string>;
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Vérifier si l'utilisateur a le rôle requis
    const currentUser = this.authService.currentUserValue;
    if (currentUser && requiredRoles.includes(currentUser.role)) {
      return true;
    }

    // Rôle non autorisé, rediriger vers le tableau de bord
    this.router.navigate(['/dashboard']);
    return false;
  }
}