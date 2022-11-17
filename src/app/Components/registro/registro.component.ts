import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  private email: string;
  private password: string;
  public emailRegistration: string;
  public passwordRegistration: string;

  constructor(
    private _authService: AuthenticationService,
    private _toastr: ToastrService) {
    this.email = "";
    this.password = "";
    this.emailRegistration = "";
    this.passwordRegistration = "";
  }

  ngOnInit(): void {
  }

  signUp(): void {
    this.email = this.emailRegistration;
    this.password = this.passwordRegistration;

    if (this.email !== "" && this.password !== "") {
      this._authService.signUp(this.email, this.password).then(() => { }).catch(() => { });
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
        this.emailRegistration = "optimus@autobots.com";
        this.passwordRegistration = "optimus";
        break;
      case 2:
        this.emailRegistration = "megatron@decepticons.com";
        this.passwordRegistration = "megatron";
        break;
      case 3:
        this.emailRegistration = "thundertron@starseekers.com";
        this.passwordRegistration = "thundertron";
        break;
      case 4:
        this.emailRegistration = "quintessons@admin.com";
        this.passwordRegistration = "quintessons";
        break;
      default:
        break;
    }
  }
}
