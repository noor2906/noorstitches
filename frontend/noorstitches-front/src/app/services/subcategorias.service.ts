import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subcategoria } from '../interfaces/subcategoria.interface';

@Injectable({
    providedIn: 'root'
})
export class SubcategoriaService {
    
    apiUrl: string = `${environment.apiUrl}/subcategorias`;
    http = inject(HttpClient);

    //get categorias
    getSubcategorias() {
        return this.http.get<Subcategoria[]>(`${this.apiUrl}`);
    }

}