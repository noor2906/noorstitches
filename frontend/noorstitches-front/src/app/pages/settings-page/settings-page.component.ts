import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Usuario } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../utils/form.utils';
import { AlertsService } from '../../services/alert.service';
import { CommonModule, DatePipe } from '@angular/common';
import { PedidoService } from '../../services/pedidos.service';
import { Pedido } from '../../interfaces/pedido.interface';
import { LineaPedido } from '../../interfaces/lineaPedido.interface';
import { PrecioEuroPipe } from '../../shared/pipes/precio-euro.pipe';
import { EnumEstadoPedido } from '../../interfaces/enumEstado.interface';

@Component({
  selector: 'app-settings-page',
  imports: [CommonModule, ReactiveFormsModule, MatIcon, DatePipe, PrecioEuroPipe],
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
  pedidosUser = signal<Pedido[] | null>([]);
  pedidosUserFiltrados = signal<Pedido[] | null>([]);
  listaLineasPedidos = signal<LineaPedido[]>([]);
  lineasPorPedido = signal(new Map<number, LineaPedido[]>());

  // Todos los estados menos el "pendiente" porque es el que se usa para el carrito
  estadosPedidos = signal(
    Object.entries(EnumEstadoPedido).filter(([key, value]) => value !== 'pendiente')
  );

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
    this.findAllPedidosByUser();
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
      if (response.length != 0) {
        this.numPedidosUser.set(response.length - 1);
      } else {
        this.numPedidosUser.set(response.length);
      }
    })
  }

  //Mis pedidos --------------------------------------------

  findAllPedidosByUser(){
    this.pedidoService.findPedidosByUser(this.idUser).subscribe((response) => {
      const pedidosFiltrados = response.filter((pedido: any) => pedido.estado !== 'pendiente');
      this.pedidosUser.set(pedidosFiltrados);

      this.filtrarPorEstado({ target: { value: 'todos' } } as unknown as Event);

      pedidosFiltrados.forEach((pedido) => {
      this.pedidoService.findLineasPedidoByPedido(pedido.id!).subscribe((lineas) => {
          // Clona el Map actual y le agrega las nuevas líneas
          const mapActual = new Map(this.lineasPorPedido());
          mapActual.set(pedido.id!, lineas);
          this.lineasPorPedido.set(mapActual);
        });
      });

    })
  }

  filtrarPorEstado(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement?.value;

     if (value === 'todos' || !value) {
      this.pedidosUserFiltrados.set(this.pedidosUser() ?? []);
    } else {
      const pedidosFiltrados = this.pedidosUser()!.filter(pedido => pedido.estado === value) ?? [];
      this.pedidosUserFiltrados.set(pedidosFiltrados);
    }
  }


}

