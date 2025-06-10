import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../../interfaces/user.interface';
import { AlertsService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';
import { ProductosFavoritosService } from '../../../services/productosFavoritos.service';
import { FormUtils } from '../../../utils/form.utils';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../../services/pedidos.service';

@Component({
  selector: 'app-mi-perfil',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent implements OnInit {
  fb = inject(FormBuilder);
  alertService = inject(AlertsService);
  authService = inject(AuthService);
  productoFavoritoService = inject(ProductosFavoritosService);
  pedidoService = inject(PedidoService);

  idUser = Number(localStorage.getItem('idUser'));
  userLogueado = signal<Usuario | null>(null);
  numPedidosUser = signal<number | null>(null);
  numProductosFavoritos = signal<number>(0); // Número de productos favoritos del usuario

 userForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(FormUtils.nombrePattern)]],
      apellidos: ['', [Validators.required, Validators.pattern(FormUtils.apellidoPattern)]],
      email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
      password: ['', [Validators.required, Validators.pattern(FormUtils.passwordPattern)]],
      passwordConfirm: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(FormUtils.telefonoPattern)]],
      fotoPerfil: ['', [Validators.required, Validators.minLength(5)]],
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
              fotoPerfil: "user.png",
              direccion: user.direccion ?? '',
              ciudad: user.ciudad ?? '',
              provincia: user.provincia ?? '',
              codigoPostal: user.codigoPostal ?? '',
              pais: user.pais ?? ''
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
    this.numProductosFavoritosByUser();
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

    const { nombre, apellidos, email, password, passwordConfirm, telefono, fotoPerfil, direccion, ciudad, provincia, codigoPostal, pais } = this.userForm.value;

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
      fotoPerfil: fotoPerfil ?? '',
      direccion: direccion ?? '',
      ciudad: ciudad ?? '',
      provincia: provincia ?? '',
      codigoPostal: codigoPostal ?? '',
      pais: pais ?? '',
    };

    console.log(userActualizado);

    // Aquí nos suscribimos al observable que devuelve el servicio de registro
    this.authService.guardarCambios(userActualizado).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.authService.setUserLogueado(userActualizado);
        this.alertService.success('Noorstitches', '¡Cambios actualizados correctamente!', null);
      },
      error: (error) => {
        console.error('Error inesperado:', error);      
      }
    });
  }

  obtenerNumPedidosUser(){
    this.pedidoService.findPedidosByUser(this.idUser).subscribe((response) => {
      if (response.length != 0) {
        this.numPedidosUser.set(response.length - 1);
      } else {
        this.numPedidosUser.set(response.length);
      }
    })
  }

  numProductosFavoritosByUser() {
    this.productoFavoritoService.findAllFavoritosByUser(this.idUser).subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.numProductosFavoritos.set(response.length);
          console.log(`Productos favoritos encontrados: ${this.numProductosFavoritos()}`);
        } else {
          this.numProductosFavoritos.set(0);
          console.log("No hay productos favoritos");
        }
      },
      (error: any) => {
        console.error("Error al cargar los productos favoritos: " + error);
      }
    );
  }

}
