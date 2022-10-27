import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HighScore } from 'src/app/Entities/HighScore/high-score';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { FirestoreService } from 'src/app/Services/FireStore/firestore.service';

@Component({
  selector: 'app-adivina-quien',
  templateUrl: './adivina-quien.component.html',
  styleUrls: ['./adivina-quien.component.css']
})
export class AdivinaQuienComponent implements OnInit {
  public gameOver: Boolean;
  public Score: number;
  public imgTf: string;
  public inputAnswer: string;
  public inputHint: string;
  public showTextHint: boolean;
  public countHint: number;
  public disableIconHint: boolean;
  private correctAnswer: string;
  private scoring: HighScore;
  private dateToday: string;

  constructor(
    private toaster: ToastrService,
    private _router: Router,
    private firestore: FirestoreService,
    public authService: AuthenticationService
  ) {
    this.gameOver = false;
    this.Score = 0;
    this.imgTf = "assets/Games/Guess-Who/1.png";
    this.inputAnswer = "";
    this.inputHint = "";
    this.showTextHint = false;
    this.countHint = 0;
    this.disableIconHint = false;
    this.correctAnswer = "";
    this.scoring = new HighScore();
    this.dateToday = new Date().toString();
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.Score != 0) {
        this.scoring = new HighScore(this.authService.user, this.dateToday, this.Score);
        this.firestore.addHighScore(this.scoring, this.firestore.gameDScoreAmount, "guessWho_HighScore");
        this.Score = 0;
      }
    });
  }

  ngOnInit(): void {
    this.setupGame();
  }

  setupGame() {
    var imgName = Math.floor(Math.random() * 4);
    imgName++;

    this.imgTf = "assets/Games/Guess-Who/" + imgName + ".png";
    switch (imgName) {
      case 1:
        this.correctAnswer = "megatron";
        break;
      case 2:
        this.correctAnswer = "starscream";
        break;
      case 3:
        this.correctAnswer = "soundwave";
        break;
      case 4:
        this.correctAnswer = "shockwave";
        break;
      default:
        break;
    }
  }

  guessTf() {
    if (this.inputAnswer.toLowerCase() == this.correctAnswer) {
      if (this.countHint == 0) {
        this.Score += 100;
      } else if (this.countHint == 1) {
        this.Score += 50;
      } else {
        this.Score += 25;
      }
      this.toaster.success("Ganaste!");
      this.resetGame(false);
    } else {
      this.gameOver = true;
      if (this.Score != 0) {
        this.scoring = new HighScore(this.authService.user, this.dateToday, this.Score);
        this.firestore.addHighScore(this.scoring, this.firestore.gameDScoreAmount, "guessWho_HighScore");
        this.Score = 0;
      }
    }
  }

  resetGame(hardReset: boolean) {
    if(hardReset){
      this.Score=0
    }    
    this.countHint = 0;
    this.showTextHint = false;
    this.gameOver = false;
    this.disableIconHint = false;
    this.inputAnswer = "";
    this.inputHint = "";
    this.setupGame();
  }

  showHint() {
    this.countHint++;
    if (this.countHint == 2) {
      this.showTextHint = true;
      this.disableIconHint = true;
      switch (this.correctAnswer) {
        case "megatron":
          this.inputHint = "Es el lider de los decepticons"
          break;
        case "starscream":
          this.inputHint = "Es el 2do al mando de lo decepticons"
          break;
        case "soundwave":
          this.inputHint = "Es el decepticon mas leal de todos"
          break;
        case "shockwave":
          this.inputHint = "Es el lider decepticon interino de cybertron"
          break;
        default:
          break;
      }
    }
  }
}