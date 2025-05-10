import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../interfaces/categoria.interface';
import { MatIcon } from '@angular/material/icon';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-home-page',
  imports: [MatIcon],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {

  categoriaService = inject(CategoriaService);
  productoService = inject(ProductoService);

  categorias = signal<Categoria[]>([]);
  productosDestacables = signal<Producto[]>([]);

  ngOnInit() {
    this.getCategorias();
    this.getProductos();
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

  getProductos(){
    this.productoService.getProductos().subscribe(
      (response) => {
        console.log(response);
        this.productosDestacables.set(response.filter(destacable => destacable.esDestacado == true));
      },
      (error) => {
        console.error("Error al cargar los productos: " + error)
      }
    )
  }
}
