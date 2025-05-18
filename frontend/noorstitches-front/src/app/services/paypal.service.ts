import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pedido } from '../interfaces/pedido.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PayPalService {
  private apiUrl = `${environment.apiUrl}/pedidos`;

  http = inject( HttpClient);


  finalizarCompra(pedido: Pedido) {
    return this.http.put(`${this.apiUrl}/finalizarCompra`, pedido);
  }
}
