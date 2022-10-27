import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HighScore } from 'src/app/Entities/HighScore/high-score';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { FirestoreService } from 'src/app/Services/FireStore/firestore.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {
  public keys: string[];
  public words: string[];
  public hiddenWord: string;
  private wordChosen: string;
  private failuresCount: number;
  public wonGame: boolean;
  public lostGame: boolean;
  private img: any;
  public score: number;
  private scoring: HighScore;
  private dateToday: string;

  constructor(
    private _router: Router,
    private firestore: FirestoreService,
    public authService: AuthenticationService
  ) {
    this.keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    this.words = ['CASA', 'PERRO', 'ELEFANTE', 'TIGRE', 'MARIPOSA', 'VERDE', 'NEGRO', 'MANZANA', 'KIWI'];
    this.hiddenWord = "";
    this.wordChosen = "";
    this.failuresCount = 0;
    this.wonGame = false;
    this.lostGame = false;
    this.img = "";
    this.score = 0;
    this.scoring = new HighScore();
    this.dateToday = new Date().toString();
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.score != 0) {
        this.scoring = new HighScore(this.authService.user, this.dateToday, this.score);
        this.firestore.addHighScore(this.scoring, this.firestore.gameAScoreAmount, "hangedUp_HighScore");
        this.score = 0;
      }
    });
  }

  ngOnInit(): void {
    this.hiddenWord = this.underLineWord();
    this.img = (<HTMLInputElement>document.getElementById('imgHangmanGame'));
  }

  underLineWord() {
    this.wordChosen = this.randomWord();

    return this.wordChosen.replace(/./g, "_ ");
  }

  randomWord() {
    var i = Math.floor(Math.random() * this.words.length);

    return this.words[i];
  }

  keyPressed(letter: string) {
    var button = (<HTMLInputElement>document.getElementById(letter));
    var isFound = false;
    var hiddenWordSplitted = this.hiddenWord.split(" ");

    button.className = "btnKeyPressed";
    button.disabled = true;
    for (let index = 0; index < this.wordChosen.length; index++) {
      const char = this.wordChosen[index];

      if (char == letter) {
        isFound = true;
        hiddenWordSplitted[index] = letter;
      }
    }
    if (!isFound) {
      this.failuresCount++;
      this.img.src = "assets/Games/Hangman/" + this.failuresCount.toString() + ".png";
    } else {
      this.hiddenWord = hiddenWordSplitted.join(" ");
    }
    this.verifyGame();
  }

  verifyGame() {
    var hiddenWordSplitted = this.hiddenWord.split(" ");

    if (this.failuresCount == 6) {
      this.lostGame = true;
      if (this.score != 0) {
        this.scoring = new HighScore(this.authService.user, this.dateToday, this.score);
        this.firestore.addHighScore(this.scoring, this.firestore.gameAScoreAmount, "hangedUp_HighScore");
        this.score = 0;
      }
    }
    if (this.wordChosen == hiddenWordSplitted.join("")) {
      this.wonGame = true;
      this.score++;
    }
  }

  nextGame() {
    this.wonGame = false;
    this.lostGame = false;
    this.hiddenWord = this.underLineWord();
    this.failuresCount = 0;
    this.img.src = "assets/Games/Hangman/0.png";
  }

  resetGame() {
    this._router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this._router.navigate(['ahorcado']);
    });
  }
}