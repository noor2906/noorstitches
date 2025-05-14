import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pedido } from '../interfaces/pedido.interface';
import { LineaPedido } from '../interfaces/lineaPedido.interface';
import { Producto } from '../interfaces/producto.interface';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  apiUrlPedidos: string = `${environment.apiUrl}/pedidos`;
  apiUrlLineasPedido: string = `${environment.apiUrl}/lineapedido`;

  http = inject(HttpClient);
  router = inject(Router);

  //add de pedido(idUser)
  crearPedido(idUser: number): Observable<Pedido> {
    const pedido = {
        importe: 0,
        fecha: new Date(),
        estado: "pendiente"
    };

    return this.http.post<Pedido>(`${this.apiUrlPedidos}/add/${idUser}`, pedido);
  }

  //add de lineapedido(idPedido)
  crearLineaDePedido(idPedido: number, cantidad: number, producto: Producto): Observable<LineaPedido> {

    //busco el pedido por id
    this.findByIdPedido(idPedido).subscribe((response)=> {
      if(response == null){
        
      }
    })

    const lineaPedido = {
        importe: 0,
        cantidad: 1,
        estado: "pendiente"
    };

    return this.http.post<LineaPedido>(`${this.apiUrlLineasPedido}/add/${idPedido}`, lineaPedido);
  }

  findByIdPedido(idPedido: number) {
    return this.http.get<Pedido>(`${this.apiUrlPedidos}/${idPedido}`);
  }

  
  //updateCantidad(idLineaPedido)
  //finalizarCompra(Pedido)
}
