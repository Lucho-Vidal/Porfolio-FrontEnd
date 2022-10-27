import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
  experiencia: Experiencia[] = [];
  isAdmin = false;
  today: number = new Date().getFullYear();

  constructor(
    private sExperiencia: SExperienciaService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.cargarExperiencia();
    this.isAdmin = this.tokenService.isAdmin();
  }

  cargarExperiencia(): void {
    this.sExperiencia.lista().subscribe((data) => {
      this.experiencia = data;
      for (let e of this.experiencia) {
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
    if (id != undefined && this.isAdmin) {
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
            title: 'La experiencia se elimino correctamente',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          this.sExperiencia.delete(id).subscribe(
            (data) => {
              this.cargarExperiencia();
            },
            (err) => {
              Swal.fire({
                title: 'No se pudo borrar la experiencia',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
              });
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
