import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private email: string;
  private password: string;
  public emailLogin: string;
  public passwordLogin: string;

  constructor(
    private _authService: AuthenticationService,
    private _toastr: ToastrService) {
    this.email = "";
    this.password = "";
    this.emailLogin = "";
    this.passwordLogin = "";
  }

  logIn(): void {
    // this.email = (<HTMLInputElement>document.getElementById("emailLogin")).value;
    // this.password = (<HTMLInputElement>document.getElementById("passwordLogin")).value;
    this.email = this.emailLogin;
    this.password = this.passwordLogin;

    if (this.email !== "" && this.password !== "") {
      this._authService.signIn(this.email, this.password).then(() => { }).catch(() => { });
    } else if (this.email == "" && this.password !== "") {
      this._toastr.error("El email no puede estar vacio");
    } else if (this.email !== "" && this.password == "") {
      this._toastr.error("La clave no puede estar vacia");
    } else {
      this._toastr.error("Ingrese algo en los campos o vuelva atras");
    }
  }

  enterCredentials(userType: number) {
    switch (userType) {
      case 1:
        // (<HTMLInputElement>document.getElementById("emailLogin")).value = "optimus@autobots.com";
        // (<HTMLInputElement>document.getElementById("passwordLogin")).value = "optimus";
        this.emailLogin = "optimus@autobots.com";
        this.passwordLogin = "optimus";
        break;
      case 2:
        // (<HTMLInputElement>document.getElementById("emailLogin")).value = "megatron@decepticons.com";
        // (<HTMLInputElement>document.getElementById("passwordLogin")).value = "megatron";
        this.emailLogin = "megatron@decepticons.com";
        this.passwordLogin = "megatron";
        break;
      case 3:
        // (<HTMLInputElement>document.getElementById("emailLogin")).value = "thundertron@starseeker.com";
        // (<HTMLInputElement>document.getElementById("passwordLogin")).value = "thundertron";
        this.emailLogin = "thundertron@starseekers.com";
        this.passwordLogin = "thundertron";
        break;
      default:
        break;
    }
  }
}
