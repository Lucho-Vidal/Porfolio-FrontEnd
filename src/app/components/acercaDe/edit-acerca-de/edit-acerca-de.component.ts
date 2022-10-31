import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona.model';
import { ImageService } from 'src/app/service/image.service';
import { PersonaService } from 'src/app/service/persona.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-edit-acerca-de',
  templateUrl: './edit-acerca-de.component.html',
  styleUrls: ['./edit-acerca-de.component.css']
})
export class EditAcercaDeComponent implements OnInit {
  persona:Persona=null;
  contador:number;
  constructor(
    private activatedRouter: ActivatedRoute,
    private personaService: PersonaService,
    private router: Router,
    public imageService: ImageService
    ) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.personaService.detail(id).subscribe(
      data =>{
        this.persona = data;
      }, err =>{
         alert("Error al modificar");
         this.router.navigate(['']);
      }
    )
  }
  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    //this.persona.img = this.imageService.images[1];
    //this.persona.imgBanner = this.imageService.images[0];
    
    this.personaService.update(id, this.persona).subscribe(
      data => {
        Swal.fire({
          title:'Los datos personales se editaron correctamente',
          icon:'success',
          showConfirmButton: false,
          timer: 1500
      })
        this.router.navigate(['']);
      }, err => {
        alert("Error al modificar ");
        this.router.navigate(['']);
      }
    )
  }
  uploadImage($event:any){
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "perfil_" + id;
    this.imageService.uploadImage($event,name)
    this.persona.img =  this.searchImage(this.imageService.images,name);
  }
  uploadImageBanner($event:any){
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "banner_" + id;
    this.imageService.uploadImage($event,name)
    this.persona.imgBanner = this.searchImage(this.imageService.images,name);
  }
  
  searchImage(listImg:string[],nombreBuscado:string):string{
    let url:string='';
    for (let img of listImg){
      if(img.includes(nombreBuscado)){
        url = img;
      }
    }
    return url;
  }
  onKey(event:any){
    this.contador = event.target.value.length
   }
}
