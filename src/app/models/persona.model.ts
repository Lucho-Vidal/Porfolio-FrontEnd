export class Persona{
    id?:number;
    nombre: string;
    apellido: string;
    descripcion:string;
    img: string;
    titulo: string;
    locacion:string;

    constructor(nombre: string,apellido: string,descripcion:string, img: string,titulo: string,locacion:string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.descripcion = descripcion;
        this.img = img;
        this.titulo = titulo;
        this.locacion = locacion; 
    }
}