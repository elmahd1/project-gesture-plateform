// src/app/core/core.module.ts
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Import services
import { AuthService } from './services/auth.service';
import { ProjectService } from './services/project.service';
import { TaskService } from './services/task.service';
import { UserService } from './services/user.service';
import { NotificationService } from './services/notification.service';
import { ReportService } from './services/report.service';

// Import interceptors (to be created)
// import { AuthInterceptor } from './interceptors/auth.interceptor';
// import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    ProjectService,
    TaskService,
    UserService,
    NotificationService,
    ReportService,
    // Uncomment when you create these interceptors
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class CoreModule {
  // Prevent reimporting the CoreModule
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it only in AppModule');
    }
  }
}
