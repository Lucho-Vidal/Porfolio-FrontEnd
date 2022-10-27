export class Experiencia {
  id?: number;
  nombreE: string;
  img: string;
  fechaInicio: string;
  fechaFin: string;
  anios: number;
  descripcionE: string;

  constructor(
    nombreE: string,
    img: string,
    fechaInicio: string,
    fechaFin:string,
    descripcionE: string,
    anios: number
  ) {
    this.nombreE = nombreE;
    this.img = img;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.anios = anios;
    this.descripcionE = descripcionE;
  }
}
