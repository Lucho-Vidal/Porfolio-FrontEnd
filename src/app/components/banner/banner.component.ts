import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona.model';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  persona: Persona = null;
  isLogged = false;
  constructor(
    public personaService: PersonaService,
  ) {}

  ngOnInit(): void {
    this.cargarPersona();
    //console.log("banner:"+ this.persona.imgBanner);
    
  }
  cargarPersona() {
    this.personaService.detail(1).subscribe((data) => {
      this.persona = data;
    });
  }
}
