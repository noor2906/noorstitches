export interface Pedido {
  id: number | null | undefined;
  importe: number | null | undefined;
  fecha: Date | null | undefined;
  estado: string | null | undefined; //TODO: averiguar si esto está bien (enum)

  //TODO: averiguar si necesito aquí lista de lineas de pedido
}