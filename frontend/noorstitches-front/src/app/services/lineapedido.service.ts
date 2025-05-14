import { Producto } from './../interfaces/producto.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pedido } from '../interfaces/pedido.interface';
import { LineaPedido } from './../interfaces/lineaPedido.interface';
import { inject, Injectable, signal } from '@angular/core';
import { ProductoService } from './producto.service';

@Injectable({providedIn: 'root'})
export class LineaPedidoService {

  apiUrlLineasPedido: string = `${environment.apiUrl}/lineaspedido`;

  http = inject(HttpClient);
  router = inject(Router);
  productoService = inject(ProductoService);
  productoBuscado = signal<Producto | null>(null);


    updateCantidadProductoLineaPedido(cantidadProducto: number, idLineaPedido: number): Observable<LineaPedido> {
        return this.http.put<LineaPedido>(`${this.apiUrlLineasPedido}/${idLineaPedido}/updateCantidad`, cantidadProducto);
    }

    findProductoById(idProducto: number) {
      this.productoService.getProductoById(idProducto).subscribe({
         next: (response) => {
          this.productoBuscado.set(response);
          console.log(response);
        },
        error: (err) => console.error('Error al recoger las lineas de pedido del pedido', err)
      });
    }
    
   addLineaPedidoToPedido(cantidadInput: number, idProducto: number, idPedido: number): Observable<LineaPedido> {
    // 1. Obtenemos el producto primero
    return this.productoService.getProductoById(idProducto).pipe(
      // 2. Cuando lo tengamos, creamos el cuerpo y hacemos el POST
      switchMap((producto) => {
        console.log('Producto obtenido:', producto);
        const lineaPedido = {
          cantidad: cantidadInput,
          producto: producto
        };
        return this.http.post<LineaPedido>(`${this.apiUrlLineasPedido}/add/${idPedido}`, lineaPedido);
      })
    );
  }
}