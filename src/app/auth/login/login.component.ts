import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '/dashboard';
  error = '';
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // Rediriger vers l'accueil si déjà connecté
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this.initializeForm();
    
    // Obtenir l'URL de retour depuis les paramètres de route ou par défaut '/dashboard'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  // Getter pour faciliter l'accès aux champs du formulaire
  get f() { return this.loginForm.controls; }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    // S'arrêter ici si le formulaire est invalide
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(
      this.f['email'].value,
      this.f['password'].value,
      this.f['rememberMe'].value
    )
    .pipe(first())
    .subscribe({
      next: () => {
        this.router.navigate([this.returnUrl]);
      },
      error: error => {
        this.error = error;
        this.loading = false;
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  loginWithGoogle(): void {
    // this.loading = true;
    // this.authService.loginWithGoogle()
    //   .then(() => {
    //     this.router.navigate([this.returnUrl]);
    //   })
    //   .catch(error => {
    //     this.error = error;
    //     this.loading = false;
    //   });
  }

  loginWithMicrosoft(): void {
    // this.loading = true;
    // this.authService.loginWithMicrosoft()
    //   .then(() => {
    //     this.router.navigate([this.returnUrl]);
    //   })
    //   .catch(error => {
    //     this.error = error;
    //     this.loading = false;
    //   });
  }
}
