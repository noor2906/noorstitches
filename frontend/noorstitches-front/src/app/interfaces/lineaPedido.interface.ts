import { Producto } from "./producto.interface";

export interface LineaPedido {
  id: number;
  cantidad: number | null | undefined;
  importe: number | null | undefined;
  productoDTO: Producto;
}