import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ResultadoEncuestaActivateGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {


  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var isLogged = this.authService.isLogged;
    var email = this.authService.user;
    var returnAux = false;

    if (isLogged && email == "quintessons@admin.com") {
      returnAux = true;
    }

    return returnAux;
  }

}
