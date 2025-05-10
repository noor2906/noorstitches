import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../interfaces/categoria.interface';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {
    
    apiUrl: string = `${environment.apiUrl}/categorias`;
    http = inject(HttpClient);

    //GET CATEGORIAS
    getCategorias() {
        return this.http.get<Categoria[]>(`${this.apiUrl}`);
    }
}