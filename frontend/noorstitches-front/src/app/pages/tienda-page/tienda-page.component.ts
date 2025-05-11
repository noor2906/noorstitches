import { Component, inject, OnInit, signal } from '@angular/core';
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

  productosTienda = signal<Producto[]>([]);

  
  ngOnInit() {
    this.getProductosTienda();
  }

  getProductosTienda(){
    this.productoService.getProductos().subscribe(
      (response) => {
        this.productosTienda.set(response);
        console.log(this.productosTienda());
      },
      (error) => {
        console.error("Error al cargar los productos: " + error)
      }
    )
  }
}
