import { Producto } from './../../interfaces/producto.interface';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-producto-page',
  imports: [MatIcon],
  templateUrl: './producto-page.component.html',
  styleUrl: './producto-page.component.css',
})
export class ProductoPageComponent implements OnInit {
  productoService = inject(ProductoService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  carritoService = inject(CarritoService);

  producto = signal<Producto | null>(null);
  origen: string = 'tienda'; // valor por defecto
  idUser = signal(Number(localStorage.getItem("idUser"))); 

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

  getProductoById(id: number) {
    this.productoService.getProductoById(id).subscribe((producto) => {
      this.producto.set(producto);
      console.log('Producto: ' + producto.id);
    });
  }

  volver() {
    this.router.navigate([this.origen === 'home' ? '/home' : '/tienda']);
  }

  anyadirAlCarrito() {
    //add de pedido(idUser)
    
    this.carritoService.crearPedido(this.idUser()).subscribe((response) => {
      console.log(response);
    })



    //add de lineapedido(idPedido)
    //updateCantidad(idLineaPedido)
    //finalizarCompra(Pedido)
  }
}
