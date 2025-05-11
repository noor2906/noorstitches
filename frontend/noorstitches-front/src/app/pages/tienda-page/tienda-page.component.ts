import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-tienda-page',
  imports: [],
  templateUrl: './tienda-page.component.html',
  styleUrl: './tienda-page.component.css'
})
export class TiendaPageComponent implements OnInit{

  productoService = inject(ProductoService);

  productosTienda = signal<Producto[]>([]);  // Productos completos
  productosABuscar = signal<Producto[]>([]); // Productos filtrados

  ngOnInit() {
    this.getProductosTienda();
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
}
