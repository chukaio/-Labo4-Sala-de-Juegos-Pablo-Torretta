import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isLogged: boolean;
  constructor(public _authService: AuthenticationService) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    this._authService.getIsLogged().subscribe((res) => {
      this.isLogged = res;
    })
  }

}
