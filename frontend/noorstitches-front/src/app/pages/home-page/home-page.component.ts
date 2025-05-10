import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  categoriaService = inject(CategoriaService);
  categorias = signal<Categoria[]>([]);

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe(
      (response) => {
        console.log(response);
        this.categorias.set(response);
      },
      (error) => {
        console.error("Error al recibir las categorías" + error);
      }
    );
  }
}
