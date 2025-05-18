import { Producto } from './../../interfaces/producto.interface';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { Pedido } from '../../interfaces/pedido.interface';
import { PedidoService } from '../../services/pedidos.service';
import { LineaPedido } from '../../interfaces/lineaPedido.interface';
import { LineaPedidoService } from '../../services/lineapedido.service';
import { PrecioEuroPipe } from '../../shared/pipes/precio-euro.pipe';
import { AlertsService } from '../../services/alert.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-producto-page',
  imports: [MatIcon, PrecioEuroPipe],
  templateUrl: './producto-page.component.html',
  styleUrl: './producto-page.component.css',
})
export class ProductoPageComponent implements OnInit {
  productoService = inject(ProductoService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  pedidoService = inject(PedidoService);
  lineaPedidoService = inject(LineaPedidoService);
  alertService = inject(AlertsService);
  carritoService = inject(CarritoService);

  producto = signal<Producto | null>(null);
  origen: string = 'tienda'; // valor por defecto
  idUser = signal(Number(localStorage.getItem("idUser"))); 
  ultimoPedido = signal<Pedido | null>(null);
  lineasPedidoByPedido = signal<LineaPedido[]>([]);

  cantidadProducto = signal<number>(1);

  ngOnInit(): void {
    //Recogemos el id de la ruta
    const id = Number(this.route.snapshot.params['id']);
    this.getProductoById(id);

    const navigationState = history.state;
    console.log('Navigation State: ', navigationState); // Verifica si el estado tiene el valor esperado
    if (navigationState?.origen) {
      this.origen = navigationState.origen;
    }
  }

  getProductoById(id: number) {
    this.productoService.getProductoById(id).subscribe({
      next: (producto) => {
        this.producto.set(producto);
        console.log('Producto: ' + producto.id);
      },
      error: (err) => console.error('Error al crear el pedido', err)
    });
  }

  volver() {
    this.router.navigate([this.origen === 'home' ? '/home' : '/tienda']);
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
      this.cantidadProducto.set(nuevaCantidad); 
    }
  }

  decrementarCantidad(input: HTMLInputElement): void {
    const actual = parseInt(input.value, 10);
    if (actual > 1) {
      const nuevaCantidad = actual - 1;
      input.value = String(nuevaCantidad);
      this.cantidadProducto.set(nuevaCantidad); 
    }
  }

anyadirAlCarrito(idProducto: number, cantidadProducto: string) {
  const cantidadInput = Number(cantidadProducto);

  // 1. Traer pedidos del usuario
  this.pedidoService.findPedidosByUser(this.idUser()).subscribe((response) => {
    const ultimo = response.pop() || null;

    // 2. Evaluar estado del último pedido
    if (!ultimo || ultimo.estado === "completado" || ultimo.estado === "cancelado") {
      // 2.1 Crear nuevo pedido
      this.pedidoService.crearPedido(this.idUser()).subscribe({
        next: (nuevoPedido) => {
          console.log("Nuevo pedido: ", nuevoPedido);
          
          // 2.2 Crear primera línea con el nuevo pedido
          this.crearLineaDePedido(cantidadInput, idProducto, nuevoPedido.id!);
        },
        error: (err) => console.error('Error al crear el pedido', err)
      });

    } else if (ultimo.estado === "pendiente") {
      // 3. Pedido pendiente -> revisar líneas de pedido
      this.pedidoService.findLineasPedidoByPedido(ultimo.id!).subscribe({
        next: (lineas) => {
          this.lineasPedidoByPedido.set(lineas);

          const lineaExistente = this.lineasPedidoByPedido().find(lp => lp.productoDTO?.id == idProducto);
          
          if (lineaExistente && lineaExistente.cantidad != undefined && lineaExistente.cantidad != null) {
            const nuevaCantidad = lineaExistente.cantidad + cantidadInput; // 2 + 5 = 7

            if (nuevaCantidad <= 5) {
              // 3.1 Actualizar cantidad si <= 5
              this.lineaPedidoService.updateCantidadProductoLineaPedido(nuevaCantidad, lineaExistente.id!).subscribe({
                next: (res) => {
                  console.log('Cantidad actualizada', res);
                  // Recargar líneas para actualizar el carrito
                  this.pedidoService.findLineasPedidoByPedido(ultimo.id!).subscribe(lineas => {
                    this.carritoService.actualizarLineasPedido(lineas);
                  });
                },
                error: (err) => console.error('Error al actualizar cantidad', err)
              });
            } else {
              // 3.2 Mostrar alerta si pasa de 5
              this.alertService.error('Noorstitches', '¡Oops! Solo puedes añadir hasta 5 unidades de este producto en tu carrito :)');
            }

          } else {
            // 4. Producto no estaba en líneas -> crear nueva
            this.crearLineaDePedido(cantidadInput, idProducto, ultimo.id!);
          }
        },
        error: (err) => console.error('Error al obtener líneas de pedido', err)
      });
    }
  });
}


  crearLineaDePedido(cantidadInput: number, idProducto: number, idPedido: number) {
    this.lineaPedidoService.addLineaPedidoToPedido(cantidadInput, idProducto, idPedido).subscribe({
      next: (response) => {
        console.log(response);
        // Recargar líneas para actualizar el carrito
        this.pedidoService.findLineasPedidoByPedido(idPedido).subscribe(lineas => {
          this.carritoService.actualizarLineasPedido(lineas);
        });
      },
      error: (err) => console.error('Error al crear una nueva linea de pedido', err)
    });
  }

}
