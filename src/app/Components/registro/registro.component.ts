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

  constructor(
    private _authService: AuthenticationService,
    private _toastr: ToastrService) {
    this.email = "";
    this.password = "";
  }

  ngOnInit(): void {
  }

  signUp(): void {
    this.email = (<HTMLInputElement>document.getElementById("emailRegistration")).value;
    this.password = (<HTMLInputElement>document.getElementById("passwordRegistration")).value;

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
        (<HTMLInputElement>document.getElementById("emailRegistration")).value = "user1@mail.com";
        (<HTMLInputElement>document.getElementById("passwordRegistration")).value = "user01";
        break;
      case 2:
        (<HTMLInputElement>document.getElementById("emailRegistration")).value = "user2@mail.com";
        (<HTMLInputElement>document.getElementById("passwordRegistration")).value = "user02";
        break;
      case 3:
        (<HTMLInputElement>document.getElementById("emailRegistration")).value = "user3@mail.com";
        (<HTMLInputElement>document.getElementById("passwordRegistration")).value = "user03";
        break;
      default:
        break;
    }
  }
}
