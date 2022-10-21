import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login.component';
import { RegistroComponent } from './components/auth/registro.component';
import { NewExperienciaComponent } from './components/experiencia/new-experiencia/new-experiencia.component';
import { EditExperienciaComponent } from './components/experiencia/edit/edit-experiencia.component';
import { EditEducacionComponent } from './components/educacion/edit-educacion/edit-educacion.component';
import { NewEducacionComponent } from './components/educacion/new-educacion/new-educacion.component';
import { NewSkillComponent } from './components/hys/new-skill/new-skill.component';
import { EditSkillComponent } from './components/hys/edit-skill/edit-skill.component';
import { EditAcercaDeComponent } from './components/acercaDe/edit-acerca-de/edit-acerca-de.component';
import { GuardService as guard } from './service/guard.service';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'login',component: LoginComponent},
  {path:'registro',component: RegistroComponent},
  {path:'nuevaExperiencia',component:NewExperienciaComponent, canActivate: [guard], data: {expectedRol: ['admin']}},
  {path:'editExperiencia/:id',component:EditExperienciaComponent, canActivate: [guard], data: {expectedRol: ['admin']}},
  {path:'nuevaEducacion',component:NewEducacionComponent, canActivate: [guard], data: {expectedRol: ['admin']}},
  {path:'editEducacion/:id',component:EditEducacionComponent, canActivate: [guard], data: {expectedRol: ['admin']}},
  {path:'nuevaSkill',component:NewSkillComponent, canActivate: [guard], data: {expectedRol: ['admin']}},
  {path:'editSkill/:id',component:EditSkillComponent, canActivate: [guard], data: {expectedRol: ['admin']}},
  {path:'editAcercaDe/:id',component:EditAcercaDeComponent, canActivate: [guard], data: {expectedRol: ['admin']}},
  {path:'**', redirectTo: '',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
