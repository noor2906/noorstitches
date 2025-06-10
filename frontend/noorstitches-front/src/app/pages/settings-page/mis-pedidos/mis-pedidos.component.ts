import { PrecioEuroPipe } from './../../../shared/pipes/precio-euro.pipe';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EnumEstadoPedido } from '../../../interfaces/enumEstado.interface';
import { LineaPedido } from '../../../interfaces/lineaPedido.interface';
import { Pedido } from '../../../interfaces/pedido.interface';
import { Usuario } from '../../../interfaces/user.interface';
import { AlertsService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';
import { PedidoService } from '../../../services/pedidos.service';
import { ProductosFavoritosService } from '../../../services/productosFavoritos.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mis-pedidos',
  imports: [DatePipe, PrecioEuroPipe],
  templateUrl: './mis-pedidos.component.html',
  styleUrl: './mis-pedidos.component.css',
})
export class MisPedidosComponent implements OnInit {
  fb = inject(FormBuilder);
  alertService = inject(AlertsService);
  authService = inject(AuthService);
  pedidoService = inject(PedidoService);
  productoFavoritoService = inject(ProductosFavoritosService);

  idUser = Number(localStorage.getItem('idUser'));
  userLogueado = signal<Usuario | null>(null);
  numPedidosUser = signal<number | null>(null);
  pedidosUser = signal<Pedido[] | null>([]);
  pedidosUserFiltrados = signal<Pedido[] | null>([]);
  listaLineasPedidos = signal<LineaPedido[]>([]);
  lineasPorPedido = signal(new Map<number, LineaPedido[]>());
  numProductosFavoritos = signal<number>(0); // Número de productos favoritos del usuario

  // Todos los estados menos el "pendiente" porque es el que se usa para el carrito
  estadosPedidos = signal(
    Object.entries(EnumEstadoPedido).filter(
      ([key, value]) => value !== 'pendiente'
    )
  );

  ngOnInit(): void {
    this.obtenerNumPedidosUser();
    this.findAllPedidosByUser();
    this.numProductosFavoritosByUser();
  }

  obtenerNumPedidosUser() {
    this.pedidoService.findPedidosByUser(this.idUser).subscribe((response) => {
      if (response.length != 0) {
        this.numPedidosUser.set(response.length - 1);
      } else {
        this.numPedidosUser.set(response.length);
      }
    });
  }

  findAllPedidosByUser() {
    this.pedidoService.findPedidosByUser(this.idUser).subscribe((response) => {
      const pedidosFiltrados = response.filter(
        (pedido: any) => pedido.estado !== 'pendiente'
      );
      this.pedidosUser.set(pedidosFiltrados);

      this.filtrarPorEstado({ target: { value: 'todos' } } as unknown as Event);

      pedidosFiltrados.forEach((pedido) => {
        this.pedidoService
          .findLineasPedidoByPedido(pedido.id!)
          .subscribe((lineas) => {
            // Clona el Map actual y le agrega las nuevas líneas
            const mapActual = new Map(this.lineasPorPedido());
            mapActual.set(pedido.id!, lineas);
            this.lineasPorPedido.set(mapActual);
          });
      });
    });
  }

  filtrarPorEstado(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement?.value;

    if (value === 'todos' || !value) {
      this.pedidosUserFiltrados.set(this.pedidosUser() ?? []);
    } else {
      const pedidosFiltrados =
        this.pedidosUser()!.filter((pedido) => pedido.estado === value) ?? [];
      this.pedidosUserFiltrados.set(pedidosFiltrados);
    }
  }

  numProductosFavoritosByUser() {
    this.productoFavoritoService.findAllFavoritosByUser(this.idUser).subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.numProductosFavoritos.set(response.length);
          console.log(
            `Productos favoritos encontrados: ${this.numProductosFavoritos()}`
          );
        } else {
          this.numProductosFavoritos.set(0);
          console.log('No hay productos favoritos');
        }
      },
      (error: any) => {
        console.error('Error al cargar los productos favoritos: ' + error);
      }
    );
  }
}
