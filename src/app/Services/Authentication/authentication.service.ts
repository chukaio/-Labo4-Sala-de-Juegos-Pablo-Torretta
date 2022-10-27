import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FirebaseCatchErrorService } from '../FirebaseCatchError/firebase-catch-error.service';

const app = initializeApp(environment.firebase);
const auth = getAuth(app);

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public isLogged: boolean;
  public openChat: boolean;
  private isLogged$: Subject<boolean>;
  public user: string;

  constructor(
    private catchErrorFB: FirebaseCatchErrorService,
    private _toastr: ToastrService,
    private _router: Router
  ) {
    this.isLogged = false;
    this.openChat = false;
    this.isLogged$ = new Subject();
    this.user = "";
  }

  getIsLogged() {
    console.log("Estado de usuario: " + this.isLogged);
    return this.isLogged$.asObservable();
  }

  signIn(email: string, password: string) {

    return signInWithEmailAndPassword(auth, email, password).then((userCredentials: any) => {
      const user = userCredentials.user;
      if (user) {
        this.isLogged = true;
        this.user = user.email;
        this.isLogged$.next(this.isLogged);
        this._router.navigate(['home']);
      } else {
        this._toastr.error("El logeo ha fallado!");
      }
    }).catch((error: any) => {
      console.log(error);
      this.catchErrorFB.catchError(error.code);
    });
  }

  signOut() {
    this.isLogged = false;
    this.openChat = false;
    this.user = "";
    this.isLogged$.next(this.isLogged);

    return signOut(auth);
  }

  signUp(email: string, password: string) {

    return createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
      const user2 = userCredentials.user;
      if (user2) {
        this._toastr.success("Se ha registrado con éxito!");
        this._router.navigate(['home']);
      } else {
        this._toastr.error("El registro ha fallado!");
      }
    })
      .catch((error) => {
        console.log(error.code);
        this.catchErrorFB.catchError(error.code);
      });
  }
}
