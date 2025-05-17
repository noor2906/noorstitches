import { Component, inject, OnInit, signal } from '@angular/core';
import { PerdidoService } from '../../services/pedidos.service';
import { Pedido } from '../../interfaces/pedido.interface';
import { LineaPedido } from '../../interfaces/lineaPedido.interface';
import { MatIcon } from '@angular/material/icon';
import { LineaPedidoService } from '../../services/lineapedido.service';

@Component({
  selector: 'app-carrito-page',
  imports: [MatIcon],
  templateUrl: './carrito-page.component.html',
  styleUrl: './carrito-page.component.css'
})
export class CarritoPageComponent implements OnInit {

  pedidoService = inject(PerdidoService);
  lineaPedidoService = inject(LineaPedidoService);

  idUser = signal(Number(localStorage.getItem("idUser"))); 
  cantidadProducto = signal<number>(1); // Cantidad inicial
  ultimoPedido = signal<Pedido | null>(null);
  listaLineasPedidos = signal<LineaPedido[]>([]);

  
  ngOnInit(): void {
    this.findPedidoByUser();
  }


   /**
    * Incrementamos/Decrementamos la cantidad en el input para que no salgan del rango permitido [1-5]
   * También actualiza la signal `cantidad` para mantener la sincronización.
   */

  incrementarCantidad(input: HTMLInputElement): void {
    const actual = parseInt(input.value, 10);
    if (actual < 5) {
      const nuevaCantidad = actual + 1;
      input.value = String(nuevaCantidad);
      this.cantidadProducto.set(nuevaCantidad); // <-- ACTUALIZA la signal
    }
  }

  decrementarCantidad(input: HTMLInputElement): void {
    const actual = parseInt(input.value, 10);
    if (actual > 1) {
      const nuevaCantidad = actual - 1;
      input.value = String(nuevaCantidad);
      this.cantidadProducto.set(nuevaCantidad); // <-- ACTUALIZA la signal
    }
  }


  
  findPedidoByUser(){
    this.pedidoService.findPedidosByUser(this.idUser()).subscribe(
      (response) => {        
        const ultimo = response.pop() || null;
        this.ultimoPedido.set(ultimo);
        
        if (ultimo !== null && ultimo.id !== null && ultimo.id !== undefined){
          this.findLineasPedido(ultimo.id);
        }
      }
    )
  }
  
  findLineasPedido(idPedido: number) {
    this.pedidoService.findLineasPedidoByPedido(idPedido).subscribe(
      (response) => {
        this.listaLineasPedidos.set(response);
      }
    )
  }


  eliminarLineaPedido(idLineaPedido: number) {
    this.lineaPedidoService.eliminarLineaPedido(idLineaPedido).subscribe(
      (response) => {
        console.log(response);
      }
    )
  }


  //TODO: finalizarCompra(Pedido)
  
}
