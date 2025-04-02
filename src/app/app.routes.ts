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
    path: 'login', 
    loadComponent: () => import('./auth/login/login.component').then(c => c.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./auth/register/register.component').then(c => c.RegisterComponent) 
  },
  { 
    path: 'forgot-password', 
    loadComponent: () => import('./auth/forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent) 
  },
  { 
    path: 'reset-password', 
    loadComponent: () => import('./auth/reset-password/reset-password.component').then(c => c.ResetPasswordComponent) 
  },
  
  // Dashboard and app routes - using main layout
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import("C:\\Users\\DELL\\Documents\\Workflow Frontend\\workflow\\src\\layouts\\main-layout\\main-layout.component").then(m => m.MainLayoutComponent),
    children: [
      // Dashboard routes
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard-home/dashboard-home.component').then(m => m.DashboardHomeComponent)
      },
      
      // Projects routes
      {
        path: 'projects',
        loadComponent: () => import('./projects/projects-list/projects-list.component').then(m => m.ProjectsListComponent)
      },
      {
        path: 'projects/new',
        loadComponent: () => import('./projects/project-form/project-form.component').then(m => m.ProjectFormComponent)
      },
      {
        path: 'projects/:id',
        loadComponent: () => import('./projects/project-details/project-details.component').then(m => m.ProjectDetailsComponent)
      },
      {
        path: 'projects/:id/edit',
        loadComponent: () => import('./projects/project-form/project-form.component').then(m => m.ProjectFormComponent)
      },
      {
        path: 'projects/:id/gantt',
        loadComponent: () => import('./projects/project-gantt/project-gantt.component').then(m => m.ProjectGanttComponent)
      },
      
      // Tasks routes
      {
        path: 'tasks',
        loadComponent: () => import('./tasks/tasks-list/tasks-list.component').then(m => m.TasksListComponent)
      },
      {
        path: 'tasks/board',
        loadComponent: () => import('./tasks/task-board/task-board.component').then(m => m.TaskBoardComponent)
      },
      {
        path: 'tasks/calendar',
        loadComponent: () => import('./tasks/task-calendar/task-calendar.component').then(m => m.TaskCalendarComponent)
      },
      {
        path: 'tasks/new',
        loadComponent: () => import('./tasks/task-form/task-form.component').then(m => m.TaskFormComponent)
      },
      {
        path: 'tasks/:id',
        loadComponent: () => import('./tasks/task-details/task-details.component').then(m => m.TaskDetailsComponent)
      },
      {
        path: 'tasks/:id/edit',
        loadComponent: () => import('./tasks/task-form/task-form.component').then(m => m.TaskFormComponent)
      },
      
    // Calendrier routes
{
  path: 'calendrier',
  loadComponent: () => import('./calendrier/calendrier-view/calendrier-view.component').then(m => m.CalendrierViewComponent)
},
{
  path: 'calendrier/event/new',
  loadComponent: () => import('./calendrier/evenement-form/evenement-form.component').then(m => m.EvenementFormComponent)
},
{
  path: 'calendrier/event/:id/edit',
  loadComponent: () => import('./calendrier/evenement-form/evenement-form.component').then(m => m.EvenementFormComponent)
},
      
      // Documents routes
      {
        path: 'documents',
        loadComponent: () => import('./documents/documents-list/documents-list.component').then(m => m.DocumentsListComponent)
      },
      {
        path: 'documents/upload',
        loadComponent: () => import('./documents/document-upload/document-upload.component').then(m => m.DocumentUploadComponent)
      },
      {
        path: 'documents/:id',
        loadComponent: () => import('./documents/document-detail/document-detail.component').then(m => m.DocumentDetailComponent)
      },
      
      // Risques routes
      {
        path: 'risques',
        loadComponent: () => import('./risques/risques-list/risques-list.component').then(m => m.RisquesListComponent)
      },
      {
        path: 'risques/new',
        loadComponent: () => import('./risques/risque-form/risque-form.component').then(m => m.RisqueFormComponent)
      },
      {
        path: 'risques/:id',
        loadComponent: () => import('./risques/risque-detail/risque-detail.component').then(m => m.RisqueDetailComponent)
      },
      {
        path: 'risques/:id/edit',
        loadComponent: () => import('./risques/risque-form/risque-form.component').then(m => m.RisqueFormComponent)
      },
      
      // Reports routes
      {
        path: 'reports',
        loadComponent: () => import('./reports/reports-dashboard/reports-dashboard.component').then(m => m.ReportsDashboardComponent)
      },
      {
        path: 'reports/projects',
        loadComponent: () => import('./reports/project-reports/project-reports.component').then(m => m.ProjectReportsComponent)
      },
      {
        path: 'reports/tasks',
        loadComponent: () => import('./reports/task-reports/task-reports.component').then(m => m.TaskReportsComponent)
      },
      {
        path: 'reports/users',
        loadComponent: () => import('./reports/user-reports/user-reports.component').then(m => m.UserReportsComponent)
      },
      
      // Users routes
      {
        path: 'users',
        loadComponent: () => import('./users/users-list/users-list.component').then(m => m.UsersListComponent)
      },
      {
        path: 'users/new',
        loadComponent: () => import('./users/user-form/user-form.component').then(m => m.UserFormComponent)
      },
      {
        path: 'users/:id',
        loadComponent: () => import('./users/user-profile/user-profile.component').then(m => m.UserProfileComponent)
      },
      {
        path: 'users/:id/edit',
        loadComponent: () => import('./users/user-form/user-form.component').then(m => m.UserFormComponent)
      },
      
      // Settings routes
      {
        path: 'settings',
        loadComponent: () => import('./settings/account-settings/account-settings.component').then(m => m.AccountSettingsComponent)
      },
      {
        path: 'settings/app',
        loadComponent: () => import('./settings/app-settings/app-settings.component').then(m => m.AppSettingsComponent)
      },
      {
        path: 'settings/notifications',
        loadComponent: () => import('./settings/notification-settings/notification-settings.component').then(m => m.NotificationSettingsComponent)
      },
      {
        path: 'settings/team',
        loadComponent: () => import('./settings/team-settings/team-settings.component').then(m => m.TeamSettingsComponent)
      }
    ]
  },
  
  // Fallback route
  {
    path: '**',
    redirectTo: ''
  }
];