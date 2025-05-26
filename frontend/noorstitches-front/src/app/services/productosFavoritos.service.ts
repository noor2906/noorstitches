import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosFavoritosService {

    apiUrl: string = `${environment.apiUrl}/favoritos`;
    http = inject(HttpClient);

    //findAll productos guardados por user
    findAllFavoritosByUser(idUsuario: number): Observable<Producto[]> {
        return this.http.get<Producto[]>(`${this.apiUrl}/${idUsuario}`);
    }

    //añadir producto a favoritos
    addFavorito(idUsuario: number, idProducto: number): Observable<boolean> {
        return this.http.post<boolean>(`${this.apiUrl}/add/productos/${idProducto}/usuarios/${idUsuario}`, {});
    }

    //delete producto de favoritos
    deleteFavorito(idUsuario: number, idProducto: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiUrl}/delete/productos/${idProducto}/usuarios/${idUsuario}`);
    }
}
