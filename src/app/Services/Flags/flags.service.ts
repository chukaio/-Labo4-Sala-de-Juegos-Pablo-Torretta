import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlagsService {
  private url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = "https://restcountries.com/v3.1/";
  }

  getFlags() {
    var urlGet = this.url + "all";

    return this.http.get(urlGet);
  }
}
