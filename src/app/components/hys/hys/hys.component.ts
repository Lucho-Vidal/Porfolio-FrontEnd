import { Component, OnInit } from '@angular/core';
import { async } from 'rxjs';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/service/skill.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-hys',
  templateUrl: './hys.component.html',
  styleUrls: ['./hys.component.css'],
})
export class HysComponent implements OnInit {
  skill: Skill[];
  isAdmin = false;
  constructor(
    private skillS: SkillService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.cargarSkills();
    this.isAdmin = this.tokenService.isAdmin();
  }

   cargarSkills(): void {
    this.skillS.lista().subscribe((data) => {
      this.skill =  data;
    });
  }

  delete(id: number) {
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
            title: 'La Skill se elimino correctamente',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          this.skillS.delete(id).subscribe(
            (data) => {
              this.cargarSkills();
            },
            (err) => {
              alert('No se pudo borrar la experiencia');
            }
          );
        }
      });
    }
  }
}
