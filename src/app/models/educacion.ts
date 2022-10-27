export class Educacion {
  id?: number;
  nombreE: string;
  descripcionE: string;
  instituto: string;
  img: string;
  fechaInicio: string;
  fechaFin: string;
  anios: number;

  constructor(
    nombreE: string,
    descripcionE: string,
    instituto: string,
    img: string,
    fechaInicio: string,
    fechaFin: string,
    anios: number
  ) {
    this.nombreE = nombreE;
    this.descripcionE = descripcionE;
    this.instituto = instituto;
    this.img = img;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.anios = anios;
  }
}
