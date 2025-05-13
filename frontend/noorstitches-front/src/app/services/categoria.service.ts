import { CategoriaConSubcategorias } from './../interfaces/categoriaconsubcategorias.interface';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../interfaces/categoria.interface';
import { Subcategoria } from '../interfaces/subcategoria.interface';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {
    
    apiUrl: string = `${environment.apiUrl}/categorias`;
    http = inject(HttpClient);

    //get categorias
    getCategorias() {
        return this.http.get<Categoria[]>(`${this.apiUrl}`);
    }

    getSubcategoriasPorCategoria(idCategoria: number) {
        return this.http.get<Subcategoria[]>(`${this.apiUrl}/${idCategoria}/subcategorias`);
    }

}