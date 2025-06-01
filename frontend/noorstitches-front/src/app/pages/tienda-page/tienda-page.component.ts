import { Subcategoria } from './../../interfaces/subcategoria.interface';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto.interface';
import { SubcategoriaService } from '../../services/subcategorias.service';
import { CategoriaService } from '../../services/categoria.service';
import { CategoriaConSubcategorias } from '../../interfaces/categoriaconsubcategorias.interface';
import { forkJoin, map } from 'rxjs';
import { Categoria } from '../../interfaces/categoria.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PrecioEuroPipe } from '../../shared/pipes/precio-euro.pipe';
import { MatIcon } from '@angular/material/icon';
import { ProductosFavoritosService } from '../../services/productosFavoritos.service';
import { AlertsService } from '../../services/alert.service';

@Component({
  selector: 'app-tienda-page',
  imports: [RouterLink, PrecioEuroPipe, MatIcon],
  templateUrl: './tienda-page.component.html',
  styleUrl: './tienda-page.component.css'
})
export class TiendaPageComponent implements OnInit{

  productoService = inject(ProductoService);
  categoriaService = inject(CategoriaService);
  subcategoriaService = inject(SubcategoriaService);
  productoFavoritoService = inject(ProductosFavoritosService);
  alertService = inject(AlertsService);
  route = inject(ActivatedRoute);

  productosTienda = signal<Producto[]>([]);  // Productos completos
  productosABuscar = signal<Producto[]>([]); // Productos filtrados
  categoriasConSubcategorias = signal<CategoriaConSubcategorias[]>([]);
  categorias = signal<Categoria[]>([]);
  isFavorito = signal<boolean>(false); // Estado del botón de favorito
  idUser = Number(localStorage.getItem('idUser'));
  listaIdProductosFavoritos = signal<number[]>([]); // id de los productos favoritos del usuario
  subcategoriaPage = signal<number>(0); // Subcategoría seleccionada
  
  idSubcategoria: number  = 0;

  subcategoriaNombresNuevosMap: { 
    [key: string]: string; 
  } = {
    'Lanas&hilos_otros': 'Otros (lanas&hilos)',
    'Handmade_otros': 'Otros (handmade)',
    'Merceria_otros': 'Otros (mercería)',
    'Kits_otros': 'Otros (kits)',
  };


  ngOnInit() {
    this.cargarCategorias();
    this.cargarCategoriasConSubcategorias();

    if (this.idUser) {
      this.cargarFavoritosByUser();
    }

    this.idSubcategoria = Number(this.route.snapshot.paramMap.get('idSubcategoria'));

    if (this.idSubcategoria) {
      this.subcategoriaPage.set(this.idSubcategoria); // guardar la subcategoría activa
      
      this.productoService.getProductos().subscribe((productos) => {
        this.productosTienda.set(productos);
        const filtrados = productos.filter(p => p.subcategoriaDTO.id === this.idSubcategoria);
        this.productosABuscar.set(filtrados);
      });

    } else {
      this.getProductosTienda();
    }
  }

  // Función para cargar los productos desde el servicio
  getProductosTienda() {
    this.productoService.getProductos().subscribe(
      (response) => {
        this.productosTienda.set(response);
        this.productosABuscar.set(response); // Al principio, mostramos todos los productos
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
    const value = (event.target as HTMLSelectElement).value;
    const idSub = value ? Number(value) : null;
    
    this.subcategoriaPage.set(idSub || 0);
    
    if (!idSub) {
      this.productosABuscar.set(this.productosTienda());
      return;
    }

    this.productosABuscar.set(
      this.productosTienda().filter(p => p.subcategoriaDTO.id === idSub)
    );
  }

  cargarFavoritosByUser() {
    this.productoFavoritoService.findAllFavoritosByUser(this.idUser).subscribe(
      (response) => {
        if (response.length > 0) {
          response.forEach(producto => {
            this.listaIdProductosFavoritos.set([...this.listaIdProductosFavoritos(), producto.id!]);
          }
          );

          console.log("Productos favoritos encontrados: " + response);
        } else {
          console.log("No hay productos favoritos");
        }
      },
      (error) => {
        console.error("Error al cargar los productos favoritos: " + error);
      }
    );
  }

  favorito(idProducto: number) {

     if (!this.idUser){ 
      this.alertService.confirm(
          "Debes iniciar sesión",
          `¿Para poder añadir el producto a favoritos debes iniciar sesión. ¿Redirigir al login?`,
          "Sí",
          "No",
          ""
      );
    } else {

    const esFavorito = this.listaIdProductosFavoritos().includes(idProducto);
    
    if (esFavorito) {
        this.eliminarDeFavoritos(idProducto);
    } else {
        this.anadirAFavoritos(idProducto);
    }
  }
  }

  anadirAFavoritos(idProducto: number) {
      this.listaIdProductosFavoritos.update(ids => [...ids, idProducto]); // Optimistic UI
      this.productoFavoritoService.addFavorito(this.idUser, idProducto).subscribe({
          error: (err) => {
              this.listaIdProductosFavoritos.update(ids => ids.filter(id => id !== idProducto)); // Revertir si hay error
              console.error('Error añadiendo favorito:', err);
          }
      });
  }

  eliminarDeFavoritos(idProducto: number) {
      this.listaIdProductosFavoritos.update(ids => ids.filter(id => id !== idProducto)); // Optimistic UI
      this.productoFavoritoService.deleteFavorito(this.idUser, idProducto).subscribe({
          error: (err) => {
              this.listaIdProductosFavoritos.update(ids => [...ids, idProducto]); // Revertir si hay error
              console.error('Error eliminando favorito:', err);
          }
      });
  }

}
