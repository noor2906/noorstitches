// carrito.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LineaPedido } from '../interfaces/lineaPedido.interface';
import { PedidoService } from './pedidos.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private lineasPedidoSubject = new BehaviorSubject<LineaPedido[]>([]);
  lineasPedido$ = this.lineasPedidoSubject.asObservable();

  actualizarLineasPedido(nuevasLineas: LineaPedido[]) {
    this.lineasPedidoSubject.next(nuevasLineas);
  }

  obtenerCantidadTotal(): number {
    return this.lineasPedidoSubject.getValue().reduce((acc, lp) => acc + (lp.cantidad || 0), 0);
  }

  loadCarrito(idUser: number, pedidoService: PedidoService) {
  pedidoService.findPedidosByUser(idUser).subscribe(pedidos => {
    const ultimoPedido = pedidos.pop();
    if (ultimoPedido) {
      pedidoService.findLineasPedidoByPedido(ultimoPedido.id!).subscribe(lineas => {
        this.actualizarLineasPedido(lineas);
      });
    } else {
      this.actualizarLineasPedido([]);
    }
  });
}

  limpiarCarrito() {
    this.actualizarLineasPedido([]);
  }

}
