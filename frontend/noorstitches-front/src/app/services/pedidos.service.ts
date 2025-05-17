import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Pedido } from '../interfaces/pedido.interface';
import { Observable } from 'rxjs';
import { LineaPedido } from '../interfaces/lineaPedido.interface';

@Injectable({providedIn: 'root'})
export class PedidoService {
  //TODO: cambiar nombre clase

  apiUrlPedidos: string = `${environment.apiUrl}/pedidos`;
  apiUrlUsuarios: string = `${environment.apiUrl}/usuarios`;

  http = inject(HttpClient);
  router = inject(Router);

  findPedidosByUser(idUsuario: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrlUsuarios}/${idUsuario}/pedidos`);
  }

  findLineasPedidoByPedido(idPedido: number): Observable<LineaPedido[]> {
    return this.http.get<LineaPedido[]>(`${this.apiUrlPedidos}/${idPedido}/lineaspedido`);
  }

}