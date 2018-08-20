import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../services/juego.service';
import { Juego } from '../models/juego'; 
@Component({
  selector: 'app-page-juegos',
  templateUrl: './page-juegos.component.html',
  styleUrls: ['./page-juegos.component.css']
})
export class PageJuegosComponent implements OnInit {

  constructor( public juegoService: JuegoService ) {
   }

  ngOnInit() {
    this.getJuegos();
  }
  getJuegos(){
    this.juegoService.getJuegos()
    .subscribe(res =>{
        this.juegoService.juegos = res as Juego[];
        console.log(res);
      })
  }
  addJuego(){
    //console.log(this.juegoService.selectedJuego);
    this.juegoService.addJuego(this.juegoService.selectedJuego).subscribe(res => {
      this.getJuegos();
      console.log(res);
    });
  }
  getImagen(juego){
    if(juego.imagen){
      return juego.imagen;
    }
    else{
      return "../../assets/placeholder1.jpg";
    }
  }

}
