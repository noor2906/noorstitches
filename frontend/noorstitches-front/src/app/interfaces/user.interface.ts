export interface Usuario {
  id: number | null | undefined;
  nombre: string | null | undefined;
  apellidos: string | null | undefined;
  email: string | undefined;
  password: string | undefined;
  fotoPerfil: string | null | undefined;
  telefono: string | null | undefined;
  direccion: string | null | undefined;
  ciudad: string | null | undefined;
  provincia: string | null | undefined;
  codigoPostal: string | null | undefined;
  pais: string | null | undefined;
}