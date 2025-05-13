import { Subcategoria } from "./subcategoria.interface";

export interface CategoriaConSubcategorias {
  id: number;
  nombre: string;
  subcategorias: Subcategoria[];
}
