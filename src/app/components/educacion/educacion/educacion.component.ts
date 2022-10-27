import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit {
  educacion: Educacion[] = [];
  isAdmin = false;
  today: number = new Date().getFullYear();
  constructor(
    private educacionS: EducacionService,
    private tokenService: TokenService
  ) {}

  isLogged = false;

  ngOnInit(): void {
    this.cargarEducacion();
    this.isAdmin = this.tokenService.isAdmin();
  }
  cargarEducacion(): void {
    this.educacionS.lista().subscribe((data) => {
      this.educacion = data;
      for(let e of this.educacion){
        if (e.fechaFin != null) {
          e.anios = parseInt(e.fechaFin) - parseInt(e.fechaInicio);
        } else {
          e.anios = this.today - parseInt(e.fechaInicio);
        }
        e.fechaInicio = this.fechaFormat(e.fechaInicio);
        e.fechaFin = this.fechaFormat(e.fechaFin);
      }
    });
  }

  delete(id?: number) {
    if (id != undefined) {
      Swal.fire({
        title: 'Estas seguro de eliminarlo?',
        text: 'Este cambio no se puede revertir!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'La educacion se elimino correctamente',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          this.educacionS.delete(id).subscribe(
            (data) => {
              this.cargarEducacion();
            },
            (err) => {
              alert('No se pudo eliminar');
            }
          );
        }
      });
    }
  }
  fechaFormat(fecha: string): string {
    const anio = fecha.slice(0, 4);
    const mes = fecha.slice(5, 7);
    const dia = fecha.slice(8, 10);
    return dia + '/' + mes + '/' + anio;
  }
}
