import { Subcategoria } from "./subcategoria.interface";

export interface Producto {
  id: number | null | undefined;
  nombre: string | null | undefined;
  descripcion: string | null | undefined;
  imagen: string | undefined;
  precio: number | undefined;
  stock: number | null | undefined;
  peso: number | null | undefined;
  longitud: string | undefined;
  material: string | undefined;
  composicion: string | undefined;
  marca: string | undefined;
  activo: boolean | undefined;
  esDestacado?: boolean;
  urlImagen: string | null;
  subcategoriaDTO: Subcategoria;
}