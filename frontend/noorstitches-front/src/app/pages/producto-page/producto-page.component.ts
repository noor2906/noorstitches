import { Producto } from './../../interfaces/producto.interface';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  router = inject(Router);

  producto = signal<Producto | null>(null);
  origen: string = 'tienda'; // valor por defecto

  ngOnInit(): void {
    //Recogemos el id de la ruta
    const id = Number(this.route.snapshot.params['id']);
    this.getProductoById(id);

    const navigationState = history.state; 
    console.log('Navigation State: ', navigationState); // Verifica si el estado tiene el valor esperado
    if (navigationState?.origen) {
      this.origen = navigationState.origen;
    }
  }

  getProductoById(id: number){
    this.productoService.getProductoById(id).subscribe((producto) => {
      this.producto.set(producto);
      console.log("Producto: " + producto.id);
    })
  }

 volver() {
  this.router.navigate([this.origen === 'home' ? '/home' : '/tienda']);
}

}

