import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

    apiUrl: string = `${environment.apiUrl}/productos`;
    http = inject(HttpClient);

    //get productos
    getProductos() {
        return this.http.get<Producto[]>(`${this.apiUrl}`);
    }
}
