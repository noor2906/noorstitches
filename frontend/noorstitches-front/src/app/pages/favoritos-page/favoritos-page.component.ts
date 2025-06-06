import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AlertsService } from '../../services/alert.service';
import { ProductosFavoritosService } from '../../services/productosFavoritos.service';
import { Producto } from '../../interfaces/producto.interface';
import { MatIcon } from '@angular/material/icon';
import { PrecioEuroPipe } from '../../shared/pipes/precio-euro.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favoritos-page',
  imports: [DatePipe, MatIcon, PrecioEuroPipe, RouterLink],
  templateUrl: './favoritos-page.component.html',
  styleUrl: './favoritos-page.component.css'
})
export class FavoritosPageComponent implements OnInit {

  productoFavoritoService = inject(ProductosFavoritosService);
  alertService = inject(AlertsService);

  isFavorito = signal<boolean>(false); // Estado del botón de favorito
  idUser = Number(localStorage.getItem('idUser'));
  listaIdProductosFavoritos = signal<number[]>([]); 
  listaProductosFavoritos = signal<Producto[]>([]); // Lista de productos favoritos del usuario

  ngOnInit() {
    this.cargarFavoritosByUser();
  }

   cargarFavoritosByUser() {
    this.productoFavoritoService.findAllFavoritosByUser(this.idUser).subscribe(
      (response) => {
        if (response.length > 0) {
          this.listaProductosFavoritos.set(response);
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
      this.listaIdProductosFavoritos.update(ids => ids.filter(id => id !== idProducto));
      this.listaProductosFavoritos.update(productos => productos.filter(p => p.id !== idProducto));

      this.productoFavoritoService.deleteFavorito(this.idUser, idProducto).subscribe({
          error: (err) => {
              this.listaIdProductosFavoritos.update(ids => [...ids, idProducto]); // Revertir si hay error
              console.error('Error eliminando favorito:', err);
          }
      });
  }

}
