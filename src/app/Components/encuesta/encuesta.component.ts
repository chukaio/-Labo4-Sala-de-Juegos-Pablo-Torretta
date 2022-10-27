import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/Entities/Quiz/quiz';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { FirestoreService } from 'src/app/Services/FireStore/firestore.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  public quizForm: FormGroup;
  public allUnchecked: boolean;
  public firstTime: boolean;
  private quiz: Quiz;
  private newQuizId: number;

  constructor(
    private fb: FormBuilder,
    private firestore: FirestoreService,
    public authService: AuthenticationService,
    private router: Router
  ) {
    this.quizForm = this.fb.group({
      inputName: ['', [Validators.required]],
      inputLastName: ['', [Validators.required]],
      inputAge: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      inputPhone: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      slcFaction: ['', [Validators.required]],
      ckbGames: this.fb.group({
        ckbGameA: ['', []],
        ckbGameB: ['', []],
        ckbGameC: ['', []],
        ckbGameD: ['', []],
      }),
      txtComment: ['', [Validators.required]],
    });
    this.allUnchecked = true;
    this.firstTime = true;
    this.quiz = new Quiz();
    this.newQuizId = 0;
  }

  ngOnInit(): void {
    this.firestore.getCollection("quizzes", "quizID").subscribe((quizzes) => {
      this.newQuizId = quizzes.length + 1;
    });
  }

  disableButton() {
    var returnValue = false;

    if (this.allChecksAreUnchecked() || !this.quizForm.valid) {
      returnValue = true;
    }

    return returnValue;
  }

  allChecksAreUnchecked() {
    var checkboxA = <HTMLInputElement>document.getElementById("ckbGameA");
    var checkboxB = <HTMLInputElement>document.getElementById("ckbGameB");
    var checkboxC = <HTMLInputElement>document.getElementById("ckbGameC");
    var checkboxD = <HTMLInputElement>document.getElementById("ckbGameD");
    var returnValue = true;
    this.allUnchecked = true;

    if (checkboxA.checked == true || checkboxB.checked == true || checkboxC.checked == true || checkboxD.checked == true) {
      returnValue = false;
      this.firstTime = false;
      this.allUnchecked = false;
    }

    return returnValue;
  }

  sendQuiz() {
    var name = this.quizForm.controls['inputName'].value;
    var lastName = this.quizForm.controls['inputLastName'].value;
    var age = this.quizForm.controls['inputAge'].value;
    var phone = this.quizForm.controls['inputPhone'].value;
    var faction = this.quizForm.controls['slcFaction'].value;
    var gameA = this.quizForm.get(['ckbGames', 'ckbGameA'])?.value == "" ? false : true;
    var gameB = this.quizForm.get(['ckbGames', 'ckbGameB'])?.value == "" ? false : true;
    var gameC = this.quizForm.get(['ckbGames', 'ckbGameC'])?.value == "" ? false : true;
    var gameD = this.quizForm.get(['ckbGames', 'ckbGameD'])?.value == "" ? false : true;
    var comment = this.quizForm.controls['txtComment'].value;

    this.quiz = new Quiz(this.authService.user, name, lastName, age, phone, faction, gameA, gameB, gameC, gameD, comment);
    this.firestore.addQuiz(this.quiz,this.newQuizId);
    this.router.navigate(['home']);
  }
}