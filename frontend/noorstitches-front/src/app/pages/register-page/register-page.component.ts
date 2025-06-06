import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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

  registerStatus = signal<'success' | 'error' | null>(null);

  registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(FormUtils.nombrePattern)]],
      apellidos: ['', [Validators.required, Validators.pattern(FormUtils.apellidoPattern)]],
      email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
      password: ['', [Validators.required, Validators.pattern(FormUtils.passwordPattern)]],
      passwordConfirm: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(FormUtils.telefonoPattern)]],
      // fotoPerfil: ['', [Validators.required, Validators.minLength(5)]],
      direccion: ['', [Validators.required, Validators.pattern(FormUtils.direccionPattern)]],
      ciudad: ['', [Validators.required, Validators.pattern(FormUtils.ciudadPattern)]],
      provincia: ['', [Validators.required, Validators.pattern(FormUtils.provinciaPattern)]],
      codigoPostal: ['', [Validators.required, Validators.pattern(FormUtils.codigoPostalPattern)]],
      pais: ['', [Validators.required, Validators.pattern(FormUtils.paisPattern)]]
  }, {
      validators: this.passwordMatchValidator // Validador personalizado
  });

  private passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
      const password = form.get('password')?.value;
      const confirm = form.get('passwordConfirm')?.value;
      return password === confirm ? null : { mismatch: true };
  }


  registro(): void {
    console.log('Register form value:', this.registerForm.value);
    if (this.registerForm.invalid) {
      // Marca los campos como tocados para mostrar los errores de validación
      this.registerForm.markAllAsTouched();
      console.log('Form is invalid:', this.registerForm.errors);
      return;
    }

    const { nombre, apellidos, email, password, passwordConfirm, telefono, direccion, ciudad, provincia, codigoPostal, pais } = this.registerForm.value;

    // Verificar si las contraseñas coinciden
    if (password !== passwordConfirm) {
      this.alertService.error("Contraseñas incorrectas", "Las contraseñas deben coincidir");
      return;
    }

    const newUser: Usuario = {
      id: null,
      nombre: nombre ?? '',
      apellidos: apellidos ?? '',
      email: email ?? '',
      password: password ?? '',
      telefono: telefono ?? '',
      fotoPerfil: "user.jpg",
      direccion: direccion ?? '',
      ciudad: ciudad ?? '',
      provincia: provincia ?? '',
      codigoPostal: codigoPostal ?? '',
      pais: pais ?? '',
    };

    // Aquí nos suscribimos al observable que devuelve el servicio de registro
    this.authService.register(newUser).subscribe({
      next: (response) => {
        this.registerStatus.set('success');
        console.log('Registro exitoso:', response);
        this.alertService.success('Noorstitches', '¡Registro realizado correctamente!', '/');
      },
      error: (error) => {
        if (error.status === 409) {
          this.registerForm.get('email')?.setErrors({ emailDuplicado: true });
        } else {
          console.error('Error inesperado:', error);      
        }
        this.registerStatus.set('error');

      }
    });
  }

}
