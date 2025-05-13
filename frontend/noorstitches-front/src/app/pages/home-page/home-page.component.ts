import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../interfaces/categoria.interface';
import { MatIcon } from '@angular/material/icon';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {

  categoriaService = inject(CategoriaService);
  productoService = inject(ProductoService);
  route = inject(ActivatedRoute);

  categorias = signal<Categoria[]>([]);
  productosDestacables = signal<Producto[]>([]);
  producto = signal<Producto | null>(null);
  
  ngOnInit() {
    this.getCategorias();
    this.getProductosDestacados();

    //Recogemos el id de la ruta
    const id = Number(this.route.snapshot.params['id']);
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

  getProductosDestacados(){
    this.productoService.getProductos().subscribe(
      (response) => {
        this.productosDestacables.set(response.filter(destacable => destacable.esDestacado == true));
        console.log(this.productosDestacables());
      },
      (error) => {
        console.error("Error al cargar los productos destacados: " + error)
      }
    )
  }

  getProductoById(id: number){
    this.productoService.getProductoById(id).subscribe((producto) => {
      this.producto.set(producto);
      console.log("Producto de id: " + producto.id);
    })
  }
  
}
