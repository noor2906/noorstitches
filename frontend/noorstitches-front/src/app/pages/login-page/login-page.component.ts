import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { FormUtils } from '../../utils/form.utils';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  formUtils = FormUtils;
  router = inject(Router);
  loginStatus = signal<'success' | 'error' | null>(null);



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
    this.loginService.login(email!, password!).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.loginStatus.set('success');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(response));  // Guardamos la respuesta del backend (que contiene la info del usuario)
        // TODO: para usarlo -> const user = JSON.parse(localStorage.getItem('user') || '{}');
        setTimeout(() => this.router.navigate(['/home']), 2000);
      },
      error: (error) => {
        if (error.status === 401) {
          console.warn('Credenciales incorrectas');
          // Puedes mostrar un mensaje de error bonito al usuario
        } else {
          console.error('Error inesperado:', error);
        }
        // Mostrar mensaje de error, etc.
        this.loginStatus.set('error');
        setTimeout(() => this.router.navigate(['/register']), 2000);
      },
    });
    
    
  }
}
