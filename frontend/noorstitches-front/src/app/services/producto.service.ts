import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

    apiUrl: string = `${environment.apiUrl}/productos`;
    http = inject(HttpClient);

    //get productos
    getProductos(): Observable<Producto[]> {
        return this.http.get<Producto[]>(`${this.apiUrl}`);
    }

    //get productos by id
    getProductoById(id: number): Observable<Producto> {
      return this.http.get<Producto>(`${this.apiUrl}/${id}`)
    }
}
