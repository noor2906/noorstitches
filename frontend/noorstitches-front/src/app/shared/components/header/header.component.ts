import { Usuario } from './../../../interfaces/user.interface';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CarritoService } from '../../../services/carrito.service';
import { PedidoService } from '../../../services/pedidos.service';
import { AuthService } from '../../../services/auth.service';
import { AlertsService } from '../../../services/alert.service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  carritoService = inject(CarritoService);
  pedidoService = inject(PedidoService);
  authService = inject(AuthService);
  alertService = inject(AlertsService);

  router = inject(Router);

  cantidadProductosCarrito = 0;
  idUser = Number(localStorage.getItem('idUser'));
  userLogueado = signal<Usuario | null>(null);

  ngOnInit() {
    // Si hay idUser en localStorage, carga el usuario completo al iniciar
    if (this.idUser) {
      this.authService.findUserById(this.idUser).subscribe({
        next: (user) => {
          this.authService.setUserLogueado(user); // Actualiza el BehaviorSubject con el usuario
        },
        error: () => {
          // Si falla, limpia el localStorage y userLogueado para evitar errores
          localStorage.removeItem('idUser');
          this.authService.setUserLogueado(null);
        },
      });
    } 

    // Suscripción para actualizar la señal del usuario cuando cambia
    this.authService.userLogueado$.subscribe((user) => {
      this.userLogueado.set(user);
      if (user?.id) {
        this.carritoService.loadCarrito(user.id, this.pedidoService);
      } else {
        this.carritoService.actualizarLineasPedido([]);
      }
    });

    this.carritoService.lineasPedido$.subscribe((lineas) => {
      this.cantidadProductosCarrito = lineas.reduce(
        (acc, lp) => acc + (lp.cantidad || 0),
        0
      );
    });
  }

  async logout() {
    const confirmed = await this.alertService.confirm(
      "Vas a abandonar Noorstitches 😢",
      `¿Estás segurx de que quieres salir?`,
      "Sí",
      "No",
      "/"
    );

    if (!confirmed) return;

    this.authService.logout();
    this.carritoService.actualizarLineasPedido([]);
    this.router.navigate(['/']);
  }

}
