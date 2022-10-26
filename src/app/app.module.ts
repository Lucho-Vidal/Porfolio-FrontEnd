import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogoApComponent } from './components/logo-ap/logo-ap.component';
import { BannerComponent } from './components/banner/banner.component';
import { AcercaDeComponent } from './components/acercaDe/acercaDe/acerca-de.component';
import { ExperienciaComponent } from './components/experiencia/experiencia/experiencia.component';
import { EducacionComponent } from './components/educacion/educacion/educacion.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HardSoftSkillsComponent } from './components/hard-soft-skills/hard-soft-skills.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login.component';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from './components/auth/registro.component';
import { NewExperienciaComponent } from './components/experiencia/new-experiencia/new-experiencia.component';
import { ToastrModule } from 'ngx-toastr';
import { EditExperienciaComponent } from './components/experiencia/edit/edit-experiencia.component';
import { EditEducacionComponent } from './components/educacion/edit-educacion/edit-educacion.component';
import { NewEducacionComponent } from './components/educacion/new-educacion/new-educacion.component';
import { HysComponent } from './components/hys/hys/hys.component';
import { EditSkillComponent } from './components/hys/edit-skill/edit-skill.component';
import { NewSkillComponent } from './components/hys/new-skill/new-skill.component';
import { EditAcercaDeComponent } from './components/acercaDe/edit-acerca-de/edit-acerca-de.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { interceptorProvider } from './service/interceptor.service';
import { ProyectoComponent } from './components/proyecto/proyecto/proyecto.component';
import { EditProyectoComponent } from './components/proyecto/edit-proyecto/edit-proyecto.component';
import { NewProyectoComponent } from './components/proyecto/new-proyecto/new-proyecto.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoApComponent,
    BannerComponent,
    AcercaDeComponent,
    ExperienciaComponent,
    EducacionComponent,
    HardSoftSkillsComponent,
    ProyectoComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    NewExperienciaComponent,
    EditExperienciaComponent,
    EditEducacionComponent,
    NewEducacionComponent,
    HysComponent,
    EditSkillComponent,
    NewSkillComponent,
    EditAcercaDeComponent,
    EditProyectoComponent,
    NewProyectoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgCircleProgressModule.forRoot({}),
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [
    interceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
