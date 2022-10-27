import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {
  public openScore: boolean;
  public gameSelected: string;
  public collectionNameParent: string;
  public disableGameA: boolean;
  public disableGameB: boolean;
  public disableGameC: boolean;
  public disableGameD: boolean;

  constructor(
    public _authService: AuthenticationService,
    private _router: Router,
    private route: ActivatedRoute) {
    this.openScore = false;
    this.gameSelected = "";
    this.collectionNameParent = "";
    this.disableGameA = false;
    this.disableGameB = false;
    this.disableGameC = false;
    this.disableGameD = false;
  }

  ngOnInit(): void { }

  openScoreCard(option: number) {
    this.openScore = true;
    this.disableGameA = true;
    this.disableGameB = true;
    this.disableGameC = true;
    this.disableGameD = true;
    switch (option) {
      case 1:
        this.gameSelected = 'ahorcado';
        this.collectionNameParent = "hangedUp_HighScore";
        break;
      case 2:
        this.gameSelected = 'mayor-menor';
        this.collectionNameParent = "higherLower_HighScore";
        break;
      case 3:
        this.gameSelected = 'preguntados';
        this.collectionNameParent = "asked_HighScore";
        break;
      case 4:
        this.gameSelected = 'adivina-quien';
        this.collectionNameParent = "guessWho_HighScore";
        break;
      default:
        break;
    }
  }

  launchGame() {
    this.openScore = false;
    if (this._authService.isLogged) {
      // this._router.navigate(['./'+this.gameSelected], {relativeTo: this.route});      
      this._router.navigate([this.gameSelected]);
    } else {
      this._router.navigate(['login']);
      //this._router.navigate([this.gameSelected]); 
    }
  }

  exitScores() {
    this.openScore = false;
    this.disableGameA = false;
    this.disableGameB = false;
    this.disableGameC = false;
    this.disableGameD = false;
  }
}
