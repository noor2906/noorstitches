import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-carrito-page',
  imports: [],
  templateUrl: './carrito-page.component.html',
  styleUrl: './carrito-page.component.css'
})
export class CarritoPageComponent {

  cantidadProducto = signal<number>(1); // Cantidad inicial


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

  //TODO: finalizarCompra(Pedido)
}
