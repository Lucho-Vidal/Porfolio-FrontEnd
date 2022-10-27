import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from '../../../service/educacion.service';
import Swal from 'sweetalert2';
import { ImageService } from 'src/app/service/image.service';
@Component({
  selector: 'app-new-educacion',
  templateUrl: './new-educacion.component.html',
  styleUrls: ['./new-educacion.component.css'],
})
export class NewEducacionComponent implements OnInit {
  educacion = new Educacion('', '', '', '', '', '', 0);
  long: number;
  name: string;
  constructor(
    private educacionS: EducacionService,
    private router: Router,
    public imageService: ImageService
    ) {}

  ngOnInit(): void {}
  onCreate(): void {
    this.educacion.img =  this.searchImage(this.imageService.images,this.name);
    this.educacionS.save(this.educacion).subscribe(
      (data) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La educacion se guardo correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['']);
      },
      (err) => {
        alert('falló');
        this.router.navigate(['']);
      }
    );
  }
  uploadImage($event: any) {
    const id = this.long + 1;
    this.name = 'Educacion_' + id;
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
