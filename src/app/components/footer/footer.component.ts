import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  persona: Persona={
    nombre: '',
    apellido: '',
    descripcion: '',
    img: '',
    imgBanner:'',
    titulo:'',
    locacion:''
  };
  isLogged = false;
  constructor(
    public personaService: PersonaService,
  ) {}

  ngOnInit(): void {
    this.cargarPersona();
    
  }
  cargarPersona() {
    this.personaService.detail(1).subscribe((data) => {
      this.persona = data;
    });
  }

}
