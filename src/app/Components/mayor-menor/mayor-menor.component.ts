import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Deck } from 'src/app/Entities/Deck/deck';
import { HighScore } from 'src/app/Entities/HighScore/high-score';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { DeckService } from 'src/app/Services/Deck/deck.service';
import { FirestoreService } from 'src/app/Services/FireStore/firestore.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit {
  public deck: Deck;
  public lblCardLeft: string;
  public lblCardRight: string;
  public imgCardLeft: string;
  public imgCardRight: string;
  public score: number;
  public drawCard: boolean;
  public gameOver: boolean;
  private index: number;
  public guessedRight: boolean;
  private scoring: HighScore;
  private dateToday: string;
  
  constructor(
    private deckService: DeckService,
    private _toastr: ToastrService,
    private _router: Router,
    public authService: AuthenticationService,
    private firestore: FirestoreService
  ) {
    this.deck = new Deck();
    this.lblCardLeft = "";
    this.lblCardRight = "";
    this.imgCardLeft = "";
    this.imgCardRight = "";
    this.score = 0;
    this.drawCard = false;
    this.gameOver = false;
    this.index = -1;
    this.guessedRight = false;
    this.scoring = new HighScore();
    this.dateToday = new Date().toString();
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.score != 0) {
        this.scoring = new HighScore(this.authService.user, this.dateToday, this.score);
        this.firestore.addHighScore(this.scoring, this.firestore.gameBScoreAmount, "higherLower_HighScore");
        this.score = 0;
      }
    });
  }

  ngOnInit(): void {
    var id: string;
    var card: any;

    this.deckService.newDeck().subscribe((res) => {
      id = (<Deck>res).deck_id;
    });
    this.deckService.getCards(52, this.deck.deck_id).subscribe((res) => {
      this.deck = new Deck(id, (<Deck>res).remaining, (<Deck>res).cards);
      this.deck.cards = this.deck.cards.filter((card) => card.value != 'KING' && card.value != 'QUEEN' && card.value != 'ACE' && card.value != 'JACK' && card.value != '10');
      card = this.deck.cards.pop();
      this.lblCardLeft = card.value + " " + card.suit;
      this.imgCardLeft = card.image;
    });
  }

  guessCard(optionChoosed: string) {
    this.drawNextCard();
    if (optionChoosed == this.guessSymbol()) {
      this.score++;
      this.guessedRight = true;
    } else {
      this.gameOver = true;
      this._toastr.error("Perdiste!");
      if(this.score!=0){
        this.scoring = new HighScore(this.authService.user, this.dateToday, this.score);
        this.firestore.addHighScore(this.scoring, this.firestore.gameBScoreAmount, "higherLower_HighScore");
        this.score = 0;
      }
    }
  }

  nextCard() {
    this.lblCardLeft = this.lblCardRight;
    this.imgCardLeft = this.imgCardRight;
    this.guessedRight = false;
    this.drawCard = false;
  }

  resetGame() {
    this._router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this._router.navigate(['mayor-menor']);
  }); 
  }

  drawNextCard() {
    for (let index = 0; index < this.deck.cards.length; index++) {
      const card = this.deck.cards[index];

      if (parseInt(this.lblCardLeft.substring(0, 1)) != parseInt(card.value.toString()) && index > this.index) {
        this.index = index;
        this.drawCard = true;
        this.lblCardRight = card.value + " " + card.suit;
        this.imgCardRight = card.image;
        break;
      }
    }
  }

  guessSymbol() {
    var symbol = "";
    var leftNumber = parseInt(this.lblCardLeft.substring(0, 1));
    var rightNumber = parseInt(this.lblCardRight.substring(0, 1));

    if (rightNumber < leftNumber) {
      symbol = "<";
    } else {
      symbol = ">";
    }

    return symbol;
  }
}