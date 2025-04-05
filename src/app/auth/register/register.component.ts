import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { 
  FormBuilder, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators, 
  AbstractControl, 
  ValidationErrors 
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
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
    // Initialize form in constructor to ensure it's always defined
    this.registerForm = this.formBuilder.group({
      nom: ['', [
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      prenom: ['', [
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      email: ['', [
        Validators.required, 
        Validators.email,
        Validators.maxLength(100)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        this.passwordStrengthValidator
      ]],
      confirmPassword: ['', [
        Validators.required
      ]],
      acceptTerms: [false, [
        Validators.requiredTrue
      ]]
    }, { 
      validators: this.passwordMatchValidator 
    });

    // Debug logging
    console.log('Register Component Initialized');
    console.log('Is Authenticated:', this.authService.isAuthenticated());
    
    // Redirect to dashboard only if authenticated
    if (this.authService.isAuthenticated()) {
      console.log('Already authenticated, redirecting to dashboard');
      this.router.navigate(['/dashboard']).catch(err => {
        console.error('Navigation error:', err);
      });
    }
  }

  ngOnInit(): void {
    // Additional initialization if needed
    console.log('Register Component OnInit');
  }

  // Getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  // Custom validator for password strength
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    
    if (!value) {
      return null;
    }

    // Check for at least one uppercase letter
    const hasUpperCase = /[A-Z]/.test(value);
    // Check for at least one lowercase letter
    const hasLowerCase = /[a-z]/.test(value);
    // Check for at least one number
    const hasNumber = /[0-9]/.test(value);
    // Check for at least one special character
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

    return passwordValid ? null : { 
      passwordStrength: { 
        required: 'Le mot de passe doit contenir des majuscules, minuscules, chiffres et caractères spéciaux' 
      }
    };
  }

  // Custom validator to ensure passwords match
  passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ matchPassword: true });
      return { matchPassword: true };
    }

    if (confirmPassword?.hasError('matchPassword')) {
      confirmPassword.setErrors(null);
    }

    return null;
  }

  // Method to handle form submission
  onSubmit(): void {
    this.submitted = true;

    // Stop if form is invalid
    if (this.registerForm.invalid) {
      console.error('Form is invalid', this.registerForm.errors);
      this.displayFormErrors();
      return;
    }

    this.loading = true;
    this.error = '';

    // Prepare registration data
    const registrationData = {
      nom: this.f['nom'].value.trim(),
      prenom: this.f['prenom'].value.trim(),
      email: this.f['email'].value.trim(),
      password: this.f['password'].value
    };

    console.log('Attempting registration with:', registrationData);

    // Call registration service
    this.authService.register(registrationData).subscribe({
      next: (user) => {
        console.log('Registration successful', user);
        // Navigate to dashboard after successful registration
        this.router.navigate(['/dashboard']).catch(err => {
          console.error('Navigation error after registration:', err);
        });
      },
      error: (error) => {
        console.error('Registration error', error);
        this.error = this.extractErrorMessage(error);
        this.loading = false;
      }
    });
  }

  // Helper method to extract meaningful error message
  private extractErrorMessage(error: any): string {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      return error.error.message || 'Erreur côté client lors de l\'inscription';
    } else if (error.status) {
      // Server-side error
      switch (error.status) {
        case 400:
          return 'Données d\'inscription invalides';
        case 409:
          return 'Un compte avec cet email existe déjà';
        case 500:
          return 'Erreur serveur. Veuillez réessayer plus tard.';
        default:
          return error.message || 'Erreur lors de l\'inscription';
      }
    }
    return 'Erreur inconnue lors de l\'inscription';
  }

  // Method to display form-level errors
  private displayFormErrors(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control?.invalid) {
        console.error(`Form control ${key} is invalid:`, control.errors);
      }
    });
  }

  // Toggle password visibility methods
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}