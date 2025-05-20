import { Component, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumEstadoPedido } from '../../interfaces/enumEstado.interface';
import { Pedido } from '../../interfaces/pedido.interface';
import { PedidoService } from '../../services/pedidos.service';

@Component({
  selector: 'app-redirigiendo-page',
  imports: [MatIcon],
  templateUrl: './redirigiendo-page.component.html',
  styleUrl: './redirigiendo-page.component.css'
})
export class RedirigiendoPageComponent {

  route = inject(ActivatedRoute);
  pedidoService = inject(PedidoService);
  router = inject(Router);

  estadoPedido = signal<EnumEstadoPedido | null>(null);
  idUser = signal(Number(localStorage.getItem('idUser')));
  ultimoPedido = signal<Pedido | null>(null);

   ngOnInit(): void {
      const token = this.route.snapshot.queryParamMap.get('token');
      const payerId = this.route.snapshot.queryParamMap.get('PayerID');

      this.findUltimoPedidoByUser();
      
      // Esperamos un poco a actualizar el último pedido
      setTimeout(() => {
        if (token && payerId) {
          this.estadoPedido.set(EnumEstadoPedido.Completado);
        } else {
          this.estadoPedido.set(EnumEstadoPedido.Cancelado);
        }

  
        const estado = this.estadoPedido();
        const pedidoId = this.ultimoPedido()?.id;
  
        if (estado && pedidoId) {
          this.pedidoService.actualizarEstado(estado, { id: pedidoId } as Pedido).subscribe({
            next: (resp) => {
              console.log("Actualizar estado:", resp);
            },
            error: (err) => {
              console.log("Actualizar estado error:", err);
            }
          });
        } else {
          console.log("Faltan datos para actualizar el pedido");
        }
      }, 2000); //2 segundos para que se actualice el pedido
  
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {},
        replaceUrl: true
      });
  
      this.crearPedidoPendiente();

      setTimeout(() => {
        this.router.navigate(['/gestion-pago']);
      }, 5000);
    }

      findUltimoPedidoByUser() {
        this.pedidoService
        .findPedidosByUser(this.idUser())
        .subscribe((response) => {
          const ultimo = response.pop() || null;
          this.ultimoPedido.set(ultimo);
        });
      }

  
    crearPedidoPendiente() {
      this.pedidoService.crearPedido(this.idUser()).subscribe({
        next: (nuevoPedido) => {
          console.log("Nuevo pedido: ", nuevoPedido);
        },
        error: (err) => console.error('Error al crear el pedido', err)
      });
    }
}
