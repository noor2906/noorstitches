import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FormUtils } from '../../utils/form.utils';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertsService } from '../../services/alert.service';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent {

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  alertService = inject(AlertsService);
  formUtils = FormUtils;
  router = inject(Router);
  loginStatus = signal<'success' | 'error' | null>(null);
  error = '';

  // Definimos el formulario de login con sus validaciones
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
    password: ['', Validators.required],
  });

  login(): void {
    console.log('Login form value:', this.loginForm.value);
    if (this.loginForm.invalid) {
      // Marca los campos como tocados para mostrar los errores de validación
      this.loginForm.markAllAsTouched();
      console.log('Form is invalid:', this.loginForm.errors);
      return;
    }
  
    const { email, password } = this.loginForm.value;
  
    // Aquí nos suscribimos al observable que devuelve el servicio de login
    this.authService.login(email!, password!).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.loginStatus.set('success');
        this.alertService.success('Noorstitches', '¡Acceso correcto!.');

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(response));  // Guardamos la respuesta del backend (que contiene la info del usuario)
        // TODO: para usarlo -> const user = JSON.parse(localStorage.getItem('user') || '{}');
        setTimeout(() => this.router.navigate(['/home']), 2000);
      },
      error: (error) => {
        if (error.status === 401) {
          console.warn('Credenciales incorrectas');
          this.error = 'Usuario no registrado';
          this.alertService.error(
            'Mi app',
            'El usuario no existe. Redirigiendo a registro...'
          );

        } else {
          console.error('Error inesperado:', error);
        }
        // Mostrar mensaje de error, etc.
        this.loginStatus.set('error');
        setTimeout(() => this.router.navigate(['/register']), 5000);
      },
    });
  }
}
