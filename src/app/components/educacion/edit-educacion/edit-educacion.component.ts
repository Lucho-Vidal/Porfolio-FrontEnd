import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { ImageService } from 'src/app/service/image.service';
import  Swal  from 'sweetalert2';
@Component({
  selector: 'app-edit-educacion',
  templateUrl: './edit-educacion.component.html',
  styleUrls: ['./edit-educacion.component.css']
})
export class EditEducacionComponent implements OnInit {
  educacion: Educacion = null;
  id = this.activatedRouter.snapshot.params['id'];
  name: string = 'Educacion_' + this.id;
  
  constructor(
    private educacionS: EducacionService,
    private activatedRouter : ActivatedRoute,
    private router: Router,
    public imageService: ImageService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.educacionS.detail(id).subscribe(
      data =>{
        this.educacion = data;
      }, err =>{
         alert("Error al modificar");
         this.router.navigate(['']);
      }
    )
  }

  onUpdate(): void{
    this.educacion.img =  this.searchImage(this.imageService.images,this.name);
    this.educacionS.update(this.id, this.educacion).subscribe(
      data => {
        Swal.fire({
          title:'La educacion se edito correctamente',
          icon:'success',
          showConfirmButton: false,
          timer: 1500
      })
        this.router.navigate(['']);
      }, err => {
        alert("Error al modificar la educacion");
        this.router.navigate(['']);
      }
    )
  }
  uploadImage($event: any) {
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
