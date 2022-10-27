import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HighScore } from 'src/app/Entities/HighScore/high-score';
import { Message } from 'src/app/Entities/message';
import { Quiz } from 'src/app/Entities/Quiz/quiz';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  public gameAScoreAmount: number;
  public gameBScoreAmount: number;
  public gameCScoreAmount: number;
  public gameDScoreAmount: number;

  constructor(
    public firestore: AngularFirestore
  ) {
    this.gameAScoreAmount = 0;
    this.gameBScoreAmount = 0;
    this.gameCScoreAmount = 0;
    this.gameDScoreAmount = 0;
  }

  getCollection(collectionName: string, collectionIdProperty: string) {
    return this.firestore.collection(collectionName).valueChanges(collectionIdProperty);
  }

  addToChat(message: Message, id: number) {
    var idDocument = id.toString();
    this.firestore.collection('messages').doc(idDocument).set({
      user: message.user,
      text: message.text,
      createdAt: message.createdAt
    });
  }

  addHighScore(scoring: HighScore, id: number, collectionName: string) {
    var idDocument = id.toString();
    this.firestore.collection(collectionName).doc(idDocument).set({
      user: scoring.user,
      score: scoring.score,
      date: scoring.date
    });
  }

  addQuiz(quiz: Quiz, id: number) {
    var idDocument = id.toString();
    this.firestore.collection('quizzes').doc(idDocument).set({
      user: quiz.user,
      name: quiz.name,      
      lastName: quiz.lastName,
      age: quiz.age,
      phone: quiz.phone,
      faction: quiz.faction,
      game_HangedUp: quiz.game_HangedUp,
      game_HigherLower: quiz.game_HigherLower,
      game_Asked: quiz.game_Asked,
      game_GuessWho: quiz.game_GuessWho,
      comments: quiz.comments
    });
  }
}
