export class Proyecto {
  id: number;
  nombre: string;
  fecha: Date;
  descripcion: string;
  link: string;
  img: string;

  constructor(
    nombre: string,
    fecha: Date,
    descripcion: string,
    link: string,
    img: string
  ) {
    this.nombre = nombre;
    this.fecha = fecha;
    this.descripcion = descripcion;
    this.link = link;
    this.img = img;
  }
}
