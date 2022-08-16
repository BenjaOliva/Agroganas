export interface PostDTO {
  id: string;
  Nombre: string;
  Descripcion: string;
  Agronomia?: string;
  Categoria: string;
  Principal: boolean;
  Destacado: boolean;
  Oferta: boolean;
  Imagen: string[];
  Propiedades: string;
  PrpiedadesTexto: string;
  Publicante?: string;
  Provincia: string;
  Localidad: string;
}
