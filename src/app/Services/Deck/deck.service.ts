import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = "https://www.deckofcardsapi.com/api/deck/";
  }

  getCards(count: number, id?: string) {
    if(typeof(id===undefined)){
      var urlGet = this.url + "new/draw/?count=" + count.toString();
    }else{
      var urlGet = this.url + "<<" + id + ">>/draw/?count=" + count.toString();
    }

    return this.http.get(urlGet);
  }

  newDeck(){
    var urlNew = this.url+"new/";

    return this.http.get(urlNew);
  }
}
