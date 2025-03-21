import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private formBuilder: FormBuilder,
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
  }

  // Getter pour faciliter l'accès aux champs du formulaire
  get f() { return this.registerForm.controls; }

  initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ matchPassword: true });
    } else {
      // S'il n'y a pas d'autres erreurs, supprimer l'erreur matchPassword
      const confirmErrors = form.get('confirmPassword')?.errors;
      if (confirmErrors && !confirmErrors['required']) {
        form.get('confirmPassword')?.setErrors(null);
      }
    }
    
    return null;
  }

  onSubmit(): void {
    this.submitted = true;

    // S'arrêter ici si le formulaire est invalide
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register({
      name: this.f['name'].value,
      email: this.f['email'].value,
      // password: this.f['password'].value
    })
    .pipe(first())
    .subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
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

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  loginWithGoogle(): void {
    // this.loading = true;
    // this.authService.loginWithGoogle()
    //   .then(() => {
    //     this.router.navigate(['/dashboard']);
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
    //     this.router.navigate(['/dashboard']);
    //   })
    //   .catch(error => {
    //     this.error = error;
    //     this.loading = false;
    //   });
  }
}
