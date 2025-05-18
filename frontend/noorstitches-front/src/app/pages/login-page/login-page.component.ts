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
    if (this.loginForm.invalid) {
      // Marca los campos como tocados para mostrar los errores de validación
      this.loginForm.markAllAsTouched();
      return;
    }
  
    const { email, password } = this.loginForm.value;
  
    // Aquí nos suscribimos al observable que devuelve el servicio de login
    this.authService.login(email!, password!).subscribe({
      next: (response) => {
        this.loginStatus.set('success');
        this.alertService.success('Noorstitches', '¡Acceso correcto!', '/home');

        if (response.id !== undefined && response.id !== null) {
          localStorage.setItem('idUser', response.id.toString());
        }

      },
      error: (error) => {
        if (error.status === 401) {
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
