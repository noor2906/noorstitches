export interface Pedido {
  id: number | null | undefined;
  importe: number | null | undefined;
  fecha: Date | null | undefined;
  estado: string | null | undefined; 
}