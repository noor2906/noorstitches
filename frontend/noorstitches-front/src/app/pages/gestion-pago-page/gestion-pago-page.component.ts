import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PayPalService } from '../../services/paypal.service';
import { PedidoService } from '../../services/pedidos.service';
import { EnumEstadoPedido } from '../../interfaces/enumEstado.interface';
import { Pedido } from '../../interfaces/pedido.interface';

@Component({
  selector: 'app-gestion-pago-page',
  imports: [],
  templateUrl: './gestion-pago-page.component.html',
  styleUrl: './gestion-pago-page.component.css'
})
export class GestionPagoPageComponent implements OnInit{

  mensaje: string = '';
  cargando: boolean = true;

  route = inject(ActivatedRoute);
  paypalService = inject(PayPalService);
  pedidoService = inject(PedidoService);

  estadoPedido = signal<EnumEstadoPedido | null>(null);
  idUser = signal(Number(localStorage.getItem('idUser')));
  ultimoPedido = signal<Pedido | null>(null);

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    const payerId = this.route.snapshot.queryParamMap.get('PayerID');

    this.findUltimoPedidoByUser();

    // Esperamos un poco a que se cargue el último pedido (idealmente usar rxjs o async/await)
    // Aquí hacemos un simple timeout para demo; en producción usa mejor lógica reactiva
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
    }, 500); // 0.5 segundos para que se cargue el pedido
  }

  findUltimoPedidoByUser() {
    this.pedidoService
      .findPedidosByUser(this.idUser())
      .subscribe((response) => {
        const ultimo = response.pop() || null;
        this.ultimoPedido.set(ultimo);
      });
  }
}
