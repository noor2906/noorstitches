export interface Usuario {
    id: number | null;
    nombre: string | null;
    apellidos: string | null;
    email: string;
    password: string;
    fotoPerfil: string | null;
    telefono: string | null;
  }