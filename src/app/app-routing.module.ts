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
import { GuardService  } from './service/guard.service';
import { LoginGuard } from './service/login.guard';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'login',component: LoginComponent, canActivate: [LoginGuard]},
  {path:'registro',component: RegistroComponent, canActivate: [LoginGuard]},
  {path:'nuevaExperiencia',component:NewExperienciaComponent, canActivate: [GuardService], data: {expectedRol: ['admin']}},
  {path:'editExperiencia/:id',component:EditExperienciaComponent, canActivate: [GuardService], data: {expectedRol: ['admin']}},
  {path:'nuevaEducacion',component:NewEducacionComponent, canActivate: [GuardService], data: {expectedRol: ['admin']}},
  {path:'editEducacion/:id',component:EditEducacionComponent, canActivate: [GuardService], data: {expectedRol: ['admin']}},
  {path:'nuevaSkill',component:NewSkillComponent, canActivate: [GuardService], data: {expectedRol: ['admin']}},
  {path:'editSkill/:id',component:EditSkillComponent, canActivate: [GuardService], data: {expectedRol: ['admin']}},
  {path:'editAcercaDe/:id',component:EditAcercaDeComponent, canActivate: [GuardService], data: {expectedRol: ['admin']}},
  {path:'**', redirectTo: '',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
