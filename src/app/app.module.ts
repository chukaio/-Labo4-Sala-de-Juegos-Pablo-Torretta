import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { QuienSoyComponent } from './Components/quien-soy/quien-soy.component';
import { MenuComponent } from './Components/menu/menu.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { JuegosComponent } from './Components/juegos/juegos.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ChatComponent } from './Components/chat/chat.component';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AhorcadoComponent } from './Components/ahorcado/ahorcado.component';
import { PreguntadosComponent } from './Components/preguntados/preguntados.component';
import { MayorMenorComponent } from './Components/mayor-menor/mayor-menor.component';
import { AdivinaQuienComponent } from './Components/adivina-quien/adivina-quien.component';
import { HttpClientModule } from '@angular/common/http';
import { HighScoreComponent } from './Components/high-score/high-score.component';
import { DatePipe } from './Pipes/Date/date.pipe';
import { ScorePipe } from './Pipes/Score/score.pipe';
import { EncuestaComponent } from './Components/encuesta/encuesta.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    QuienSoyComponent,
    MenuComponent,
    RegistroComponent,
    JuegosComponent,
    ChatComponent,
    AhorcadoComponent,
    PreguntadosComponent,
    MayorMenorComponent,
    AdivinaQuienComponent,
    HighScoreComponent,
    DatePipe,
    ScorePipe,
    EncuestaComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1500
    }),
    provideDatabase(() => getDatabase()),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
