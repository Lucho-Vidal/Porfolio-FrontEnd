import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css'],
})
export class ProyectoComponent implements OnInit {
  proyecto: Proyecto[];
  isAdmin = false;
  long:number=0;
  constructor(
    private sProyecto: ProyectoService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.cargarProyectos();
    this.isAdmin = this.tokenService.isAdmin();
  }

  cargarProyectos(): void {
    this.sProyecto.lista().subscribe((data) => {
      this.proyecto = data;
      for(let e of this.proyecto){
        const anio = e.fecha.slice(0,4);
        const mes = e.fecha.slice(5,7);
        const dia = e.fecha.slice(8,10); 
        e.fecha = dia+'/'+mes+'/'+anio;
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
            title: 'El proyecto se elimino correctamente',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          this.sProyecto.delete(id).subscribe((data) => {
            this.cargarProyectos();
          }),
            (err: any) => {
              Swal.fire({
                title: 'No se pudo borrar el proyecto',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
              });
            };
        }
      });
    }
  }
}
