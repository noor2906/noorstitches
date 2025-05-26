import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../interfaces/categoria.interface';
import { MatIcon } from '@angular/material/icon';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PrecioEuroPipe } from '../../shared/pipes/precio-euro.pipe';
import { AlertsService } from '../../services/alert.service';
import { ProductosFavoritosService } from '../../services/productosFavoritos.service';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, PrecioEuroPipe, MatIcon],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {

  categoriaService = inject(CategoriaService);
  productoService = inject(ProductoService);
  route = inject(ActivatedRoute);
  productoFavoritoService = inject(ProductosFavoritosService);
  alertService = inject(AlertsService);

  categorias = signal<Categoria[]>([]);
  productosDestacables = signal<Producto[]>([]);
  producto = signal<Producto | null>(null);
  isFavorito = signal<boolean>(false);
  idUser = Number(localStorage.getItem('idUser'));
  listaIdProductosFavoritos = signal<number[]>([]);

  ngOnInit() {
    this.getCategorias();
    this.getProductosDestacados();

    //Recogemos el id de la ruta
    const id = Number(this.route.snapshot.params['id']);

    this.cargarFavoritosByUser();
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
