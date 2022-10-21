import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Experiencia } from 'src/app/models/experiencia';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experiencia:Experiencia[] = [];
  constructor(private sExperiencia: SExperienciaService, private tokenService: TokenService) { }

  isLogged = false;

  ngOnInit(): void {
    this.cargarExperiencia()
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
    console.log(this.experiencia)
    
  }
  
  cargarExperiencia():void{
    this.sExperiencia.lista().subscribe(data => {this.experiencia = data;})
  }
  delete(id?: number){
    if(id != undefined){
      Swal.fire({
        title: 'Estas seguro de eliminarlo?',
        text: "Este cambio no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title:'La experiencia se elimino correctamente',
            icon:'success',
            showConfirmButton: false,
            timer: 1500
        })
          this.sExperiencia.delete(id).subscribe(
            data => {
              this.cargarExperiencia();
            }, err => {
              alert("No se pudo borrar la experiencia");
            }
          )
        }
      })
      
    }
  }

  

}

