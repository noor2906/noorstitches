import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { PedidoService } from '../../services/pedidos.service';
import { Pedido } from '../../interfaces/pedido.interface';
import { LineaPedido } from '../../interfaces/lineaPedido.interface';
import { MatIcon } from '@angular/material/icon';
import { LineaPedidoService } from '../../services/lineapedido.service';
import { FormControl, Validators } from '@angular/forms';
import { PrecioEuroPipe } from '../../shared/pipes/precio-euro.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { PayPalService } from '../../services/paypal.service';
import { AlertsService } from '../../services/alert.service';

@Component({
  selector: 'app-carrito-page',
  imports: [MatIcon, PrecioEuroPipe],
  templateUrl: './carrito-page.component.html',
  styleUrl: './carrito-page.component.css',
})
export class CarritoPageComponent implements OnInit {
  pedidoService = inject(PedidoService);
  lineaPedidoService = inject(LineaPedidoService);
  carritoService = inject(CarritoService);
  paypalService = inject(PayPalService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  alertService = inject(AlertsService);
  

  idUser = signal(Number(localStorage.getItem('idUser')));
  cantidadProducto = signal<number>(1); // Cantidad inicial
  ultimoPedido = signal<Pedido | null>(null);
  listaLineasPedidos = signal<LineaPedido[]>([]);

  @ViewChild('inputCantidad') cantidadInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      if (params['token']) {
        this.alertService.error("Ups, algo pasó con el pago :(", "El pagó se ha cancelado o no se ha podido completar correctamente. Por favor, inténtalo de nuevo.");
      }

      // Borrar el token de la URL sin recargar la página
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {},
          replaceUrl: true,
        });
    });
    
    this.findUltimoPedidoByUser();

    const compraHecha = localStorage.getItem('compra_realizada');

    if (compraHecha === 'true') {
      this.limpiarCarrito();
      localStorage.removeItem('compra_realizada');
    } else {
      this.findUltimoPedidoByUser();
    }
  }

  /**
   * Incrementamos/Decrementamos la cantidad en el input para que no salgan del rango permitido [1-5]
   * También actualiza la signal `cantidad` para mantener la sincronización.
   */

  // Control para el input de cantidad
  inputCantidad = new FormControl(1, {
    nonNullable: true,
    validators: [Validators.min(1), Validators.max(5)],
  });

  // Métodos para incrementar/decrementar cantidad
  incrementarCantidad(linea: LineaPedido) {
    if (linea.cantidad !== null && linea.cantidad !== undefined) {
      if (linea.cantidad < 5) {
        const nuevaCantidad = linea.cantidad + 1;
        this.updateCantidad(linea, nuevaCantidad);
      }
    }
  }

  decrementarCantidad(linea: LineaPedido) {
    if (linea.cantidad !== null && linea.cantidad !== undefined) {
      if (linea.cantidad > 1) {
        const nuevaCantidad = linea.cantidad - 1;
        this.updateCantidad(linea, nuevaCantidad);
      }
    }
  }

  findUltimoPedidoByUser() {
    this.pedidoService
      .findPedidosByUser(this.idUser())
      .subscribe((response) => {
        const ultimo = response.pop() || null;
        this.ultimoPedido.set(ultimo);

        if (ultimo !== null && ultimo.id !== null && ultimo.id !== undefined) {
          this.findLineasPedido(ultimo.id);
        }
      });
  }

  findLineasPedido(idPedido: number) {
    this.pedidoService
      .findLineasPedidoByPedido(idPedido)
      .subscribe((response) => {
        this.listaLineasPedidos.set(response);
        this.carritoService.actualizarLineasPedido(response);
      });
  }

  eliminarLineaPedido(idLineaPedido: number) {
    // 1. Eliminación optimista (actualizamos la UI primero)
    this.listaLineasPedidos.update((lineas) => {
      const actualizadas = lineas.filter((l) => l.id !== idLineaPedido);
      this.carritoService.actualizarLineasPedido(actualizadas);

      // Actualizar el importe total del pedido después de eliminar la línea
       if (actualizadas.length === 0) {
        this.carritoService.limpiarCarrito();
        const pedido = this.ultimoPedido();
        
        if (pedido) {
          this.ultimoPedido.set({ ...pedido, importe: 0 });
        }
      }

      return actualizadas;
    });

    // 2. Llamada al servicio para eliminar en el backend
    this.lineaPedidoService.eliminarLineaPedido(idLineaPedido).subscribe({
      next: () => {
        console.log('Línea eliminada correctamente');
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        // Opcional: Mostrar mensaje de error al usuario
        alert('No se pudo eliminar el producto. Por favor intenta nuevamente.');

        // 3. Si quieres, puedes recargar los datos como último recurso

        //this.findPedidoByUser();
      },
    });
  }

  updateCantidad(linea: LineaPedido, nuevaCantidad: number) {
    this.listaLineasPedidos.update((lineas) => {
      const actualizadas = lineas.map((l) =>
        l.id === linea.id ? { ...l, cantidad: nuevaCantidad } : l
      );
      this.carritoService.actualizarLineasPedido(actualizadas);
      return actualizadas;
    });

    // Actualización en el backend
    this.lineaPedidoService
      .updateCantidadProductoLineaPedido(nuevaCantidad, linea.id)
      .subscribe({
        next: () => {
          console.log('Cantidad actualizada');
          // Actualizar el importe total del pedido
          if (this.ultimoPedido()?.id) {
            this.pedidoService.findPedidosByUser(this.idUser()).subscribe({
              next: (pedidos) => {
                const pedidoActualizado = pedidos.find(
                  (p) => p.id === this.ultimoPedido()?.id
                );
                if (pedidoActualizado) {
                  this.ultimoPedido.set(pedidoActualizado);
                }
              },
            });
          }
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          // Revertir en caso de error
          this.listaLineasPedidos.update((lineas) =>
            lineas.map((l) =>
              l.id === linea.id ? { ...l, cantidad: linea.cantidad } : l
            )
          );
        },
      });
  }

  seguirComprando() {
    this.router.navigate(['/tienda']);
  }

  getTotalProductos(): number {
    return this.listaLineasPedidos().reduce(
      (total, linea) => total + (linea.cantidad || 0),
      0
    );
  }

  finalizarCompra(pedido: Pedido) {
    this.paypalService.finalizarCompra(pedido).subscribe({
      next: (response: any) => {
        console.log('Respuesta PayPal:', response);

        if (response && response.links) {
          const approveLink = response.links.find(
            (link: any) => link.rel === 'approve'
          );
          if (approveLink) {
            localStorage.setItem('compra_realizada', 'true');
            window.location.href = approveLink.href;
          }
        }
        
      },
      error: (err) => {
        console.log('PAYPAL ERROR: ' + err.message);
      },
    });
  }

  limpiarCarrito() {
    this.ultimoPedido.set(null);
    this.listaLineasPedidos.set([]);

    this.carritoService.actualizarLineasPedido([]);

    console.log('Carrito limpiado después de la compra.');
  }
}
