import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { ImageService } from 'src/app/service/image.service';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';
import  Swal  from 'sweetalert2';
@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css'],
})
export class EditExperienciaComponent implements OnInit {
  experiencia: Experiencia = null;
  long: number;
  name: string;
  constructor(
    private sExperiencia: SExperienciaService,
    private activatedRouter: ActivatedRoute, 
    private router: Router,
    public imageService: ImageService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sExperiencia.detail(id).subscribe(
      data =>{
        this.experiencia = data;
      }, err =>{
        alert("Error al ingresar al formulario para modificar experiencia");
        this.router.navigate(['']);
      }
    )
  }

  onUpdate(): void {
    this.experiencia.img =  this.searchImage(this.imageService.images,this.name);
    const id = this.activatedRouter.snapshot.params['id'];
    this.sExperiencia.update(id, this.experiencia).subscribe(
      data => {
        Swal.fire({
          title:'La experiencia se edito correctamente',
          icon:'success',
          showConfirmButton: false,
          timer: 1500
      })
        this.router.navigate(['']);
      }, err =>{
         alert("Error al modificar experiencia");
         this.router.navigate(['']);
      }
    )
  }
  uploadImage($event: any) {
    const id = this.long + 1;
    this.name = 'Experiencia_' + id;
    this.imageService.uploadImage($event, this.name);
  }

  searchImage(listImg: string[], nombreBuscado: string): string {
    let url: string = '';
    for (let img of listImg) {
      if (img.includes(nombreBuscado)) {
        url = img;
      }
    }
    return url;
  }
}
