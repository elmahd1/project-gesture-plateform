import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Landing page route
  {
    path: '',
    loadComponent: () => import('./landing-page/landing-page.component').then(m => m.LandingPageComponent)
  },
  
  // Auth routes
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        canActivate: [], // Remove any guards for registration
        loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
      },
      {
        path: 'reset-password/:token',
        loadComponent: () => import('./auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
      }
    ]
  },
  
  // Dashboard routes (protected by auth guard)
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./dashboard/dashboard-home/dashboard-home.component').then(m => m.DashboardHomeComponent)
  },
  
  // Project routes (protected by auth guard)
  {
    path: 'projets',
    canActivate: [authGuard],
    children: [
      // {
      //   path: '',
      //   loadComponent: () => import('./features/projet/projet-list/projet-list.component').then(m => m.ProjetListComponent)
      // },
      {
        path: 'create',
        loadComponent: () => import('./projects/project-form/project-form.component').then(m => m.ProjectFormComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./projects/project-details/project-details.component').then(m => m.ProjectDetailsComponent)
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./projects/project-form/project-form.component').then(m => m.ProjectFormComponent)
      },
      // {
      //   path: ':id/taches',
      //   loadComponent: () => import('./features/tache/tache-list/tache-list.component').then(m => m.TacheListComponent)
      // }
    ]
  },
  
  // Task routes (protected by auth guard)
  {
    path: 'taches',
    canActivate: [authGuard],
    children: [
      // {
      //   path: '',
      //   loadComponent: () => import('./features/tache/tache-list/tache-list.component').then(m => m.TacheListComponent)
      // },
      {
        path: 'create',
        loadComponent: () => import('./tasks/task-form/task-form.component').then(m => m.TaskFormComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./tasks/task-details/task-details.component').then(m => m.TaskDetailsComponent)
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./tasks/task-form/task-form.component').then(m => m.TaskFormComponent)
      }
    ]
  },
  
  // Report routes (protected by auth guard)
  {
    path: 'reports',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./reports/reports-dashboard/reports-dashboard.component').then(m => m.ReportsDashboardComponent)
      },
      {
        path: 'projects',
        loadComponent: () => import('./reports/project-reports/project-reports.component').then(m => m.ProjectReportsComponent)
      },
      {
        path: 'tasks',
        loadComponent: () => import('./reports/task-reports/task-reports.component').then(m => m.TaskReportsComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./reports/user-reports/user-reports.component').then(m => m.UserReportsComponent)
      }
    ]
  },
  
  // Backend test route
  {
    path: 'backend-test',
    loadComponent: () => import('./core/backend-test/backend-test.component').then(m => m.BackendTestComponent)
  },
  
  // Wildcard route - redirect to dashboard
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];