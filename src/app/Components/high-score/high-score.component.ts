import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HighScore } from 'src/app/Entities/HighScore/high-score';
import { FirestoreService } from 'src/app/Services/FireStore/firestore.service';

@Component({
  selector: 'app-high-score',
  templateUrl: './high-score.component.html',
  styleUrls: ['./high-score.component.css']
})
export class HighScoreComponent implements OnChanges {
  public scores: HighScore[];
  @Input() collectionName: string;

  constructor(
    private firestore: FirestoreService
  ) {
    this.scores = [];
    this.collectionName = "";
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.collectionName);
    this.firestore.getCollection(this.collectionName, "scoreID").subscribe((scores) => {
      switch (this.collectionName) {
        case "hangedUp_HighScore":
          this.firestore.gameAScoreAmount = scores.length;
          break;
        case "higherLower_HighScore":
          this.firestore.gameBScoreAmount = scores.length;
          break;
        case "asked_HighScore":
          this.firestore.gameCScoreAmount = scores.length;
          break;
        case "guessWho_HighScore":
          this.firestore.gameDScoreAmount = scores.length;
          break;
        default:
          break;
      }
      scores.forEach((element) => {
        if (this.scores.length <= 10) {
          this.scores.push(element as HighScore);
          this.scores = this.scores.sort((a, b) => b.score - a.score);
        }
      });
    });
  }
}
