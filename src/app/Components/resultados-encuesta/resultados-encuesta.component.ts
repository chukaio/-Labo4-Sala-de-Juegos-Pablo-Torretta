import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/Entities/Quiz/quiz';
import { FirestoreService } from 'src/app/Services/FireStore/firestore.service';

@Component({
  selector: 'app-resultados-encuesta',
  templateUrl: './resultados-encuesta.component.html',
  styleUrls: ['./resultados-encuesta.component.css']
})
export class ResultadosEncuestaComponent implements OnInit {
  public quizzes: Quiz[]

  constructor(
    private firestore: FirestoreService
  ) {
    this.quizzes = [];
  }

  ngOnInit(): void {
    this.firestore.getCollection("quizzes", "quizID").subscribe((quizzes) => {
      quizzes.forEach((element: any) => {
        this.quizzes.push(element);
      });
    });
  }

}
