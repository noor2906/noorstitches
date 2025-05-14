import { Producto } from './../../interfaces/producto.interface';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CarritoService } from '../../services/carrito.service';
import { Pedido } from '../../interfaces/pedido.interface';
import { PerdidoService } from '../../services/pedidos.service';
import { LineaPedido } from '../../interfaces/lineaPedido.interface';
import { LineaPedidoService } from '../../services/lineapedido.service';

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
  pedidoService = inject(PerdidoService);
  lineaPedidoService = inject(LineaPedidoService);

  producto = signal<Producto | null>(null);
  origen: string = 'tienda'; // valor por defecto
  idUser = signal(Number(localStorage.getItem("idUser"))); 
  ultimoPedido = signal<Pedido | null>(null);
  lineasPedidoByPedido = signal<LineaPedido[]>([]);

  cantidadProducto = signal<number>(1);

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
    this.productoService.getProductoById(id).subscribe({
      next: (producto) => {
        this.producto.set(producto);
        console.log('Producto: ' + producto.id);
      },
      error: (err) => console.error('Error al crear el pedido', err)
    });
  }

  volver() {
    this.router.navigate([this.origen === 'home' ? '/home' : '/tienda']);
  }

  /**
   * Incrementamos/Decrementamos la cantidad en el input para que no salgan del rango permitido [1-5]
   * También actualiza la signal `cantidad` para mantener la sincronización.
   */
  incrementarCantidad(input: HTMLInputElement): void {
    const actual = parseInt(input.value, 10);
    if (actual < 5) {
      const nuevaCantidad = actual + 1;
      input.value = String(nuevaCantidad);
      this.cantidadProducto.set(nuevaCantidad); // <-- ACTUALIZA la signal
    }
  }

  decrementarCantidad(input: HTMLInputElement): void {
    const actual = parseInt(input.value, 10);
    if (actual > 1) {
      const nuevaCantidad = actual - 1;
      input.value = String(nuevaCantidad);
      this.cantidadProducto.set(nuevaCantidad); // <-- ACTUALIZA la signal
    }
  }

  //lógica para añadir al carrito
  //TODO: limitar cantidad: traerme la cantidad que tiene la linea de pedido del producto que intento meter
    // si tiene + de 5 sacar un popup diciendo que está limitado a 5 productos
//   anyadirAlCarrito(idProducto: number, cantidadProducto: string) {
  
//     //sacamos los pedidos del usuario y nos guardamos el último
//     this.pedidoService.findPedidosByUser(this.idUser()).subscribe((response)=> {
//       this.ultimoPedido.set(response.pop() || null);
//     })

//     //COMPROBAMOS EL ESTADO DEL PEDIDO
//     //  pedido -> null -> nuevo pedido
//     //  "completado" || "cancelado" -> nuevo pedido
//     //  "pendiente" -> creamos SOLO la nueva linea de pedido

//     if (this.ultimoPedido() == null || this.ultimoPedido()?.estado == "completado" || this.ultimoPedido()?.estado == "cancelado"){
//        //Creamos un pedido nuevo de estado "pendiente" -> add de pedido(idUser)
//        this.carritoService.crearPedido(this.idUser()).subscribe( {
//         next: (response) => { console.log(response)},
//         error: (err) => console.error('Error al crear el pedido', err)
//        });

//        //Crear primera linea de pedido con el producto al que hemos clickado
//        const cantidadInput = this.cantidadProducto();
//        this.crearLineaDePedido(cantidadInput, idProducto, this.ultimoPedido()?.id!);
//     } else if (this.ultimoPedido()?.estado == "pendiente") {

//       alert("el ultimo pedido es pendiente")
//       //si el producto ya existe en alguna de las lineas de pedido -> aumentar cantidad

//       // nos traemos las líneas de pedido del pedido
//       this.pedidoService.findLineasPedidoByPedido(this.ultimoPedido()?.id!).subscribe({
//         next: (response) => {
//           this.lineasPedidoByPedido.set(response);
//           console.log(response);
//         },
//         error: (err) => console.error('Error al recoger las lineas de pedido del pedido', err)
//       });

//       //recorremos la lista de lineas de pedido buscando si existe el producto ya dentro
//       this.lineasPedidoByPedido().forEach(lineaPedido => {

//         //si encontramos una linea cuyo producto sea el mismo que intentamos meter
//         if (lineaPedido.producto?.id == idProducto){
//           //si la cantidad de esa línea de pedido es menor que 5
//           if (lineaPedido.cantidad! < 5) {

//              // Calculamos la nueva cantidad sumando la cantidad actual con la cantidad que el usuario quiere añadir
//             const nuevaCantidad = lineaPedido.cantidad! + Number(cantidadProducto);
      
//             // Si la nueva cantidad no supera el límite de 5
//             if (nuevaCantidad <= 5) {
//               //hacemos update de la cantidad mínima hasta 5
//               //updateCantidad(idLineaPedido)
//               this.lineaPedidoService.updateCantidadProductoLineaPedido(Number(cantidadProducto), lineaPedido.id!).subscribe({
//                 next: (response) => {
//                 console.log(response);
//                 },
//                 error: (err) => console.error('Error al recoger las lineas de pedido del pedido', err)
//               })
//             } else {
//               // Si la nueva cantidad supera el límite, mostramos un mensaje de error o una alerta
//               //TODO: sweet alert con este mensaje quitar el alert!!!!
//               alert("No se puede agregar más de 5 unidades de este producto.");
//               console.log('No se puede agregar más de 5 unidades de este producto.');
//             }
//           }
//         } else { //sino -> crear nueva linea de pedido
//           //Crear linea de pedido nueva
//           const cantidadInput = this.cantidadProducto();
//           this.crearLineaDePedido(cantidadInput, idProducto, this.ultimoPedido()?.id!);
//         }
//       });

//   }
// }

anyadirAlCarrito(idProducto: number, cantidadProducto: string) {
  const cantidadInput = Number(cantidadProducto);

  // 1. Traer pedidos del usuario
  this.pedidoService.findPedidosByUser(this.idUser()).subscribe((response) => {
    const ultimo = response.pop() || null;
    this.ultimoPedido.set(ultimo);

    // 2. Evaluar estado del último pedido
    if (!ultimo || ultimo.estado === "completado" || ultimo.estado === "cancelado") {
      // 2.1 Crear nuevo pedido
      this.carritoService.crearPedido(this.idUser()).subscribe({
        next: (nuevoPedido) => {
          this.ultimoPedido.set(nuevoPedido);
          // 2.2 Crear primera línea con el nuevo pedido
          this.crearLineaDePedido(cantidadInput, idProducto, nuevoPedido.id!);
        },
        error: (err) => console.error('Error al crear el pedido', err)
      });

    } else if (ultimo.estado === "pendiente") {
      // 3. Pedido pendiente -> revisar líneas
      this.pedidoService.findLineasPedidoByPedido(ultimo.id!).subscribe({
        next: (lineas) => {
          this.lineasPedidoByPedido.set(lineas);

          const lineaExistente = lineas.find(lp => lp.producto?.id === idProducto);

          if (lineaExistente) {
            const nuevaCantidad = lineaExistente.cantidad! + cantidadInput;

            if (nuevaCantidad <= 5) {
              // 3.1 Actualizar cantidad si <= 5
              this.lineaPedidoService.updateCantidadProductoLineaPedido(cantidadInput, lineaExistente.id!).subscribe({
                next: (res) => console.log('Cantidad actualizada', res),
                error: (err) => console.error('Error al actualizar cantidad', err)
              });
            } else {
              // 3.2 Mostrar alerta si pasa de 5
              alert("No se puede agregar más de 5 unidades de este producto.");
            }

          } else {
            // 4. Producto no estaba en líneas -> crear nueva
            this.crearLineaDePedido(cantidadInput, idProducto, ultimo.id!);
          }
        },
        error: (err) => console.error('Error al obtener líneas de pedido', err)
      });
    }
  });
}


  //add de lineapedido(idPedido)
  crearLineaDePedido(cantidadInput: number, idProducto: number, idPedido: number) {
    this.lineaPedidoService.addLineaPedidoToPedido(cantidadInput, idProducto, idPedido).subscribe({
      next: (response) => {
          console.log(response);
        },
        error: (err) => console.error('Error al crear una nueva linea de pedido', err)
      });
  }
}
