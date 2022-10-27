import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdivinaQuienComponent } from './Components/adivina-quien/adivina-quien.component';
import { AhorcadoComponent } from './Components/ahorcado/ahorcado.component';
import { EncuestaComponent } from './Components/encuesta/encuesta.component';
import { HomeComponent } from './Components/home/home.component';
import { JuegosComponent } from './Components/juegos/juegos.component';
import { LoginComponent } from './Components/login/login.component';
import { MayorMenorComponent } from './Components/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './Components/preguntados/preguntados.component';
import { QuienSoyComponent } from './Components/quien-soy/quien-soy.component';
import { RegistroComponent } from './Components/registro/registro.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "encuesta",
    component: EncuestaComponent
  },
  {
    path: "quien-soy",
    component: QuienSoyComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "registro",
    component: RegistroComponent
  },
  // {
  //   path: "juegos",
  //   component: JuegosComponent,
  //   children: [{
  //     path: "juegos/ahorcado",
  //     component: AhorcadoComponent
  //   }, {
  //     path: "mayor-menor",
  //     component: MayorMenorComponent
  //   }, {
  //     path: "preguntados",
  //     component: PreguntadosComponent
  //   }, {
  //     path: "adivina-quien",
  //     component: AdivinaQuienComponent
  //   }
  //   ]
  // },
  {
    path: "juegos",
    component: JuegosComponent
  },
  {
    path: "ahorcado",
    component: AhorcadoComponent
  }, {
    path: "mayor-menor",
    component: MayorMenorComponent
  }, {
    path: "preguntados",
    component: PreguntadosComponent
  }, {
    path: "adivina-quien",
    component: AdivinaQuienComponent
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
