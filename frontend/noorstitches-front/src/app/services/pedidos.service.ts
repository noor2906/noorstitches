import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Pedido } from '../interfaces/pedido.interface';
import { Observable, throwError } from 'rxjs';
import { LineaPedido } from '../interfaces/lineaPedido.interface';
import { EnumEstadoPedido } from '../interfaces/enumEstado.interface';

@Injectable({providedIn: 'root'})
export class PedidoService {
  //TODO: cambiar nombre clase

  apiUrlPedidos: string = `${environment.apiUrl}/pedidos`;
  apiUrlUsuarios: string = `${environment.apiUrl}/usuarios`;

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

  findPedidosByUser(idUsuario: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrlUsuarios}/${idUsuario}/pedidos`);
  }

  findLineasPedidoByPedido(idPedido: number): Observable<LineaPedido[]> {
    return this.http.get<LineaPedido[]>(`${this.apiUrlPedidos}/${idPedido}/lineaspedido`);
  }

  findByIdPedido(idPedido: number) {
    return this.http.get<Pedido>(`${this.apiUrlPedidos}/${idPedido}`);
  }

  actualizarEstado(estado: EnumEstadoPedido, pedido: Pedido | null): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrlPedidos}/actualizarEstado/${estado}`, pedido?.id);
  }


}