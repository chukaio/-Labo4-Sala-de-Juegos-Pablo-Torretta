import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCatchErrorService {

  constructor(
    private _toastr: ToastrService
  ) { }

  catchError(code: string) {
    switch (code) {
      case "auth/email-already-in-use":
        this._toastr.info("El correo ya está en uso");
        break;
      case "auth/invalid-email":
        this._toastr.info("Formato inválido de correo");
        break;
      case "auth/user-not-found":
        this._toastr.info("El usuario no esta registrado");
        break;
      case "":
        this._toastr.info("");
        break;
          
      default:
        break;
    }
  }
}
