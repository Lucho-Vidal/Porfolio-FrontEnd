import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css'],
})
export class AcercaDeComponent implements OnInit {
  persona: Persona={
    nombre: '',
    apellido: '',
    descripcion: '',
    img: '',
    imgBanner:'',
    titulo:'',
    locacion:''
  };
  isAdmin = false;
  constructor(
    public personaService: PersonaService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.cargarPersona();
    this.isAdmin = this.tokenService.isAdmin();
  }
  cargarPersona() {
    this.personaService.detail(1).subscribe((data) => {
      this.persona = data;
    });
  }
}
