import { Subcategoria } from './../../interfaces/subcategoria.interface';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto.interface';
import { SubcategoriaService } from '../../services/subcategorias.service';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaConSubcategorias } from '../../interfaces/categoriaconsubcategorias.interface';
import { forkJoin, map } from 'rxjs';
import { Categoria } from '../../interfaces/categoria.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tienda-page',
  imports: [RouterLink],
  templateUrl: './tienda-page.component.html',
  styleUrl: './tienda-page.component.css'
})
export class TiendaPageComponent implements OnInit{

  productoService = inject(ProductoService);
  categoriaService = inject(CategoriaService);
  subcategoriaService = inject(SubcategoriaService);


  productosTienda = signal<Producto[]>([]);  // Productos completos
  productosABuscar = signal<Producto[]>([]); // Productos filtrados
  categoriasConSubcategorias = signal<CategoriaConSubcategorias[]>([]);
  categorias = signal<Categoria[]>([]);

  subcategoriaNombresNuevosMap: { 
    [key: string]: string; 
  } = {
    'Lanas&hilos_otros': 'Otros (lanas&hilos)',
    'Handmade_otros': 'Otros (handmade)',
    'Merceria_otros': 'Otros (mercería)',
    'Kits_otros': 'Otros (kits)',
  };


  ngOnInit() {
    this.getProductosTienda();
    this.cargarCategorias();
    this.cargarCategoriasConSubcategorias();
  }

  // Función para cargar los productos desde el servicio
  getProductosTienda() {
    this.productoService.getProductos().subscribe(
      (response) => {
        this.productosTienda.set(response);
        this.productosABuscar.set(response); // Al principio, mostramos todos los productos

        console.log(this.productosTienda());
      },
      (error) => {
        console.error("Error al cargar los productos: " + error)
      }
    )
  }

  // Función para filtrar productos al buscar
  onSearch(query: string) {
    const filtered = this.productosTienda().filter(product =>
      product.nombre?.toLowerCase().includes(query.toLowerCase())
    );
    this.productosABuscar.set(filtered);  // Actualizamos los productos a mostrar
  }

  // Cargamos las categorías
  cargarCategorias() {
    this.categoriaService.getCategorias().subscribe(
      (response) => {
        this.categorias.set(response);

        console.log("Categorias: " + response);
      })
  }


  // Cargamos las subcategorias por categoria
  cargarCategoriasConSubcategorias() {
    this.categoriaService.getCategorias().subscribe(categorias => {
      const peticiones = categorias.map(cat =>
        this.categoriaService.getSubcategoriasPorCategoria(cat.id).pipe(
          map(subs => {
           // Modificamos los nombres de las subcategorías usando el mapa
            subs.forEach(sub => {
              if (this.subcategoriaNombresNuevosMap[sub.nombre]) {
                sub.nombre = this.subcategoriaNombresNuevosMap[sub.nombre];
              }
            });

            return {
              id: cat.id,
              nombre: cat.nombre,
              subcategorias: subs
            };
          })
        )
      );

      forkJoin(peticiones).subscribe((resultado: CategoriaConSubcategorias[]) => {
          this.categoriasConSubcategorias.set(resultado);
      });
    });
  }


  filtrarPorSubcategoria(event: Event) {

    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement?.value;

    if (!value) {
      this.productosABuscar.set(this.productosTienda());
      return;
    }

    const filtered = this.productosTienda().filter(
      producto => producto.subcategoriaDTO.id === +value //+value -> convierte a number: '3' → 3
    );

    this.productosABuscar.set(filtered);
  }
}
