import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HighScore } from 'src/app/Entities/HighScore/high-score';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { FirestoreService } from 'src/app/Services/FireStore/firestore.service';
import { FlagsService } from 'src/app/Services/Flags/flags.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {
  public imgFlag: string;
  public Score: number;
  public gameOver: boolean;
  public option1: string;
  public option2: string;
  public option3: string;
  public option4: string;
  private countries: any;
  public countryCorrect: string;
  private scoring: HighScore;
  private dateToday: string;

  constructor(
    private flagService: FlagsService,
    private _router: Router,
    private firestore: FirestoreService,
    public authService: AuthenticationService
  ) {
    this.imgFlag = "";
    this.Score = 0;
    this.gameOver = false;
    this.option1 = "";
    this.option2 = "";
    this.option3 = "";
    this.option4 = "";
    this.countries = [];
    this.countryCorrect = "";
    this.scoring = new HighScore();
    this.dateToday = new Date().toString();
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.Score != 0) {
        this.scoring = new HighScore(this.authService.user, this.dateToday, this.Score);
        this.firestore.addHighScore(this.scoring, this.firestore.gameCScoreAmount, "asked_HighScore");
        this.Score = 0;
      }
    });
  }

  ngOnInit(): void {
    this.flagService.getFlags().subscribe((countries) => {
      this.countries = countries;
      this.setupGame();
    });
  }

  guessFlag(option: number) {
    switch (option) {
      case 1:
        if (this.option1 == this.countryCorrect) {
          this.Score++;
          this.setupGame();
        } else {
          this.gameOver = true;
          if (this.Score != 0) {
            this.scoring = new HighScore(this.authService.user, this.dateToday, this.Score);
            this.firestore.addHighScore(this.scoring, this.firestore.gameCScoreAmount, "asked_HighScore");
            this.Score = 0;
          }
        }
        break;
      case 2:
        if (this.option2 == this.countryCorrect) {
          this.Score++;
          this.setupGame();
        } else {
          this.gameOver = true;
          if (this.Score != 0) {
            this.scoring = new HighScore(this.authService.user, this.dateToday, this.Score);
            this.firestore.addHighScore(this.scoring, this.firestore.gameCScoreAmount, "asked_HighScore");
            this.Score = 0;
          }
        }
        break;
      case 3:
        if (this.option3 == this.countryCorrect) {
          this.Score++;
          this.setupGame();
        } else {
          this.gameOver = true;
          if (this.Score != 0) {
            this.scoring = new HighScore(this.authService.user, this.dateToday, this.Score);
            this.firestore.addHighScore(this.scoring, this.firestore.gameCScoreAmount, "asked_HighScore");
            this.Score = 0;
          }
        }
        break;
      case 4:
        if (this.option4 == this.countryCorrect) {
          this.Score++;
          this.setupGame();
        } else {
          this.gameOver = true;
          if (this.Score != 0) {
            this.scoring = new HighScore(this.authService.user, this.dateToday, this.Score);
            this.firestore.addHighScore(this.scoring, this.firestore.gameCScoreAmount, "asked_HighScore");
            this.Score = 0;
          }
        }
        break;
      default:
        break;
    }
  }

  setupGame() {
    var i = Math.floor(Math.random() * this.countries.length);
    var optionButton = Math.floor(Math.random() * 4);
    var shuffledCountries = this.countries.sort(() => 0.5 - Math.random());
    var selectedCountries: any[] = [];

    this.countryCorrect = this.countries[i].translations.spa.official;
    this.imgFlag = this.countries[i].flags.png;
    shuffledCountries.forEach((element: any) => {
      if (element.translations.spa.official.length < 10 && element.translations.spa.official != this.countryCorrect && selectedCountries.length <= 3) {
        selectedCountries.push(element.translations.spa.official);
      }
    });
    switch (optionButton) {
      case 1:
        this.option1 = this.countryCorrect;
        this.option2 = selectedCountries[0];
        this.option3 = selectedCountries[1];
        this.option4 = selectedCountries[2];
        break;
      case 2:
        this.option1 = selectedCountries[0];
        this.option2 = this.countryCorrect;
        this.option3 = selectedCountries[1];
        this.option4 = selectedCountries[2];
        break;
      case 3:
        this.option1 = selectedCountries[0];
        this.option2 = selectedCountries[1];
        this.option3 = this.countryCorrect;
        this.option4 = selectedCountries[2];
        break;
      case 4:
        this.option1 = selectedCountries[0];
        this.option2 = selectedCountries[1];
        this.option3 = selectedCountries[2];
        this.option4 = this.countryCorrect;
        break;
      default:
        break;
    }
  }

  resetGame() {
    this.gameOver = false;
    this.Score = 0;
    this.setupGame();
  }
}
