import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { ImageService } from 'src/app/service/image.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css']
})
export class NewProyectoComponent implements OnInit {
  
  proyecto = new Proyecto('','','','','');
  proyectos: Proyecto[];
  long:number;
  name:string;
  constructor(
    private sProyecto: ProyectoService,
    private router:Router,
    public imageService: ImageService
  ) { }
  

  ngOnInit(): void {
    this.sProyecto.lista().subscribe((data) => {
      this.proyectos = data;
      if(this.proyectos.length == 0){
        this.long = 1;
      }else{
        this.long = this.proyectos[this.proyectos.length - 1].id;
      }
    });
  }

  onCreate(): void{
    this.proyecto.img =  this.searchImage(this.imageService.images,this.name);
    this.sProyecto.save(this.proyecto).subscribe(
      data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El proyecto se guardo correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['']);
      },err =>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'El proyecto No se pudo guardar',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['']);
      }
    )
  }

  uploadImage($event:any){
    const id = this.long + 1;
    this.name = "Proyecto_" + id;
    this.imageService.uploadImage($event,this.name);
    
  }

  searchImage(listImg:string[],nombreBuscado:string):string{
    let url:string='';
    for (let img of listImg){
      if(img.includes(nombreBuscado)){
        url = img;
      }
    }
    return url;
  }

}
