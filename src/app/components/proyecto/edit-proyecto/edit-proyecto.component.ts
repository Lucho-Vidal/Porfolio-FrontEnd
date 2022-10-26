import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { ImageService } from 'src/app/service/image.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent implements OnInit {

  proyecto = new Proyecto('',new Date(),'','','');
  proyectos: Proyecto[];
  long:number;
  id:number = this.activatedRouter.snapshot.params['id'];
  name:string = "Proyecto_" + this.id;
  constructor(
    private sProyecto: ProyectoService,
    private router:Router,
    public imageService: ImageService,
    private activatedRouter: ActivatedRoute
  ) { }
  

  ngOnInit(): void {
    this.sProyecto.detail(this.id).subscribe(
      data =>{
        this.proyecto = data;
      }, err =>{
        alert("Error al ingresar al formulario para modificar proyecto");
        this.router.navigate(['']);
      }
    )
  }

  onCreate(): void{
    this.proyecto.img =  this.searchImage(this.imageService.images,this.name);
    this.sProyecto.update(this.id,this.proyecto).subscribe(
      data => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La experiencia se guardo correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['']);
      },err =>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'La experiencia No se pudo guardar',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['']);
      }
    )
  }

  uploadImage($event:any){
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
