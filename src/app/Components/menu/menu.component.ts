import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLogged: boolean;
  
  constructor(
    public _authService: AuthenticationService,
    private _router: Router,
    private _toastr: ToastrService
  ) {
    this.isLogged = false;
   
  }

  ngOnInit(): void {
    this._authService.getIsLogged().subscribe((res) => {
      this.isLogged = res;
    })
  }

  signOut() {
    this._authService.signOut().then(() => {    
      this._toastr.success("Cerrando sesion");
      this._router.navigate(['home']);
    })
      .catch((error) => {
        console.log(error);
      });;
  }

}
