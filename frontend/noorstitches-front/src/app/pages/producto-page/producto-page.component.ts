import { Producto } from './../../interfaces/producto.interface';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-producto-page',
  imports: [MatIcon],
  templateUrl: './producto-page.component.html',
  styleUrl: './producto-page.component.css'
})
export class ProductoPageComponent implements OnInit{

  productoService = inject(ProductoService);
  route = inject(ActivatedRoute);

  producto = signal<Producto | null>(null);

  ngOnInit(): void {
    //Recogemos el id de la ruta
    const id = Number(this.route.snapshot.params['id']);
    this.getProductoById(id);
  }

  getProductoById(id: number){
    this.productoService.getProductoById(id).subscribe((producto) => {
      this.producto.set(producto);
      console.log("Producto: " + producto.id);
    })
  }
}
