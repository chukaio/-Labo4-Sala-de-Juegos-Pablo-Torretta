import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { JuegosComponent } from './Components/juegos/juegos.component';
import { LoginComponent } from './Components/login/login.component';
import { QuienSoyComponent } from './Components/quien-soy/quien-soy.component';
import { RegistroComponent } from './Components/registro/registro.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
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
  {
    path: "juegos",
    component: JuegosComponent
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
