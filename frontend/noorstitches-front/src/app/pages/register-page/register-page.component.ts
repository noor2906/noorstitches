import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormUtils } from '../../utils/form.utils';
import { Usuario } from '../../interfaces/user.interface';
import { AlertsService } from '../../services/alert.service';

@Component({
  selector: 'app-register-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  alertService = inject(AlertsService);
  formUtils = FormUtils;
  router = inject(Router);

  registerForm = this.fb.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required],
    telefono: ['', Validators.required],
    fotoPerfil: ['', Validators.required],
  });

  registro(): void {
    console.log('Register form value:', this.registerForm.value);
    if (this.registerForm.invalid) {
      // Marca los campos como tocados para mostrar los errores de validación
      this.registerForm.markAllAsTouched();
      console.log('Form is invalid:', this.registerForm.errors);
      return;
    }

    const { nombre, apellidos, email, password, passwordConfirm, telefono, fotoPerfil } = this.registerForm.value;

    // Verificar si las contraseñas coinciden
    if (password !== passwordConfirm) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    const newUser: Usuario = {
      id: null,
      nombre: nombre ?? '',
      apellidos: apellidos ?? '',
      email: email ?? '',
      password: password ?? '',
      telefono: telefono ?? '',
      fotoPerfil: fotoPerfil ?? ''
    };

    // Aquí nos suscribimos al observable que devuelve el servicio de registro
    this.authService.register(newUser).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        localStorage.setItem('isLoggedIn', 'true');
        this.alertService.success('Noorstitches', '¡Registro realizado correctamente!.');
        localStorage.setItem('user', JSON.stringify(response));  // Guardamos la respuesta del backend (que contiene la info del usuario)
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (error) => {
        console.error('Error inesperado:', error);      
      }
    });
  }

}
