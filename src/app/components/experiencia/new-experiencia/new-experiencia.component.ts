import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { ImageService } from 'src/app/service/image.service';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-new-experiencia',
  templateUrl: './new-experiencia.component.html',
  styleUrls: ['./new-experiencia.component.css'],
})
export class NewExperienciaComponent implements OnInit {
  experiencia = new Experiencia('', '', '','', '',0);
  experiencias: Experiencia[];
  long: number;
  name: string;
  constructor(
    private sExperiencia: SExperienciaService,
    private router: Router,
    public imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.sExperiencia.lista().subscribe((data) => {
      this.experiencias = data;
      this.long = this.experiencias[this.experiencias.length - 1].id;
    });
  }
  onCreate(): void {
    this.experiencia.img =  this.searchImage(this.imageService.images,this.name);
    
    this.sExperiencia.save(this.experiencia).subscribe(
      (data) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La experiencia se guardo correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['']);
      },
      (err) => {
        console.log(err);
        
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'La experiencia No se pudo guardar',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['']);
      }
    );
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
