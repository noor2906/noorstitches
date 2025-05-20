import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PayPalService } from '../../services/paypal.service';
import { PedidoService } from '../../services/pedidos.service';
import { EnumEstadoPedido } from '../../interfaces/enumEstado.interface';
import { Pedido } from '../../interfaces/pedido.interface';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { PrecioEuroPipe } from '../../shared/pipes/precio-euro.pipe';

@Component({
  selector: 'app-gestion-pago-page',
  imports: [MatIcon, RouterLink, DatePipe, PrecioEuroPipe],
  templateUrl: './gestion-pago-page.component.html',
  styleUrl: './gestion-pago-page.component.css'
})
export class GestionPagoPageComponent implements OnInit{
  
  pedidoService = inject(PedidoService);

  idUser = signal(Number(localStorage.getItem('idUser')));
  penultimoPedido = signal<Pedido | null>(null);

  ngOnInit(): void {
    this.findPenultimoPedidoByUser();
  }

  findPenultimoPedidoByUser() {
    this.pedidoService
      .findPedidosByUser(this.idUser())
      .subscribe((response) => {
        const penultimo = response[response.length - 2] || null;
        this.penultimoPedido.set(penultimo);
      });
  }
}
