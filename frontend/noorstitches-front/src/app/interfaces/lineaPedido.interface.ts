import { Producto } from "./producto.interface";

export interface LineaPedido {
  id: number | null | undefined;
  cantidad: number | null | undefined;
  importe: number | null | undefined;
  producto: Producto | null | undefined;
}