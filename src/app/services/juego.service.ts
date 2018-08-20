import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Juego } from '../models/juego';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  selectedJuego: Juego;
  juegos: Juego[];
  readonly URL_API = 'http://localhost:3000/api/juegos';

  constructor(private http: HttpClient) {
    this.selectedJuego = new Juego();
   }
  getJuegos(){
    return this.http.get(this.URL_API);
  }
}
