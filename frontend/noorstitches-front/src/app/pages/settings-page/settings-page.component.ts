import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Usuario } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../utils/form.utils';
import { AlertsService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedidos.service';

@Component({
  selector: 'app-settings-page',
  imports: [CommonModule, ReactiveFormsModule, MatIcon],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent implements OnInit {
  
  fb = inject(FormBuilder);
  alertService = inject(AlertsService);
  authService = inject(AuthService);
  pedidoService = inject(PedidoService);

  idUser = Number(localStorage.getItem('idUser'));
  userLogueado = signal<Usuario | null>(null);
  numPedidosUser = signal<number | null>(null);

  userForm = this.fb.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required],
    telefono: ['', Validators.required],
    fotoPerfil: ['', Validators.required],
  });


  ngOnInit(): void {
    // Si hay idUser en localStorage, carga el usuario completo al iniciar
    if (this.idUser) {
      this.authService.findUserById(this.idUser).subscribe({
        next: (user) => {
          this.authService.setUserLogueado(user); // Actualiza el BehaviorSubject con el usuario
          this.userLogueado.set(user);

           if (user) {
            this.userForm.patchValue({
              nombre: user.nombre,
              apellidos: user.apellidos,
              email: user.email,
              telefono: user.telefono,
              fotoPerfil: "user.png"
            });
          }
        },
        error: () => {
          // Si falla, limpia el localStorage y userLogueado para evitar errores
          localStorage.removeItem('idUser');
          this.authService.setUserLogueado(null);
        },
      });
    }

    this.obtenerNumPedidosUser();
  }

  //Mi perfil --------------------------------------------
  guardarCambios() {
     console.log('Register form value:', this.userForm.value);
    if (this.userForm.invalid) {
      // Marca los campos como tocados para mostrar los errores de validación
      this.userForm.markAllAsTouched();
      console.log('Form is invalid:', this.userForm.errors);
      return;
    }

    const { nombre, apellidos, email, password, passwordConfirm, telefono, fotoPerfil } = this.userForm.value;

    // Verificar si las contraseñas coinciden
    if (password !== passwordConfirm) {
      this.alertService.error("Contraseñas incorrectas", "Las contraseñas deben coincidir");
      return;
    }

    const userActualizado: Usuario = {
      id: this.userLogueado()!.id,
      nombre: nombre ?? '',
      apellidos: apellidos ?? '',
      email: email ?? '',
      password: password ?? '',
      telefono: telefono ?? '',
      fotoPerfil: fotoPerfil ?? ''
    };

    console.log(userActualizado);

    // Aquí nos suscribimos al observable que devuelve el servicio de registro
    this.authService.guardarCambios(userActualizado).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.alertService.success('Noorstitches', '¡Cambios actualizados correctamente!', null);
      },
      error: (error) => {
        console.error('Error inesperado:', error);      
      }
    });
  }

  obtenerNumPedidosUser(){
    this.pedidoService.findPedidosByUser(this.idUser).subscribe((response) => {
      if (this.numPedidosUser) {
        this.numPedidosUser.set(response.length);
      }
    })
  }

  //Mis pedidos --------------------------------------------
  
}



