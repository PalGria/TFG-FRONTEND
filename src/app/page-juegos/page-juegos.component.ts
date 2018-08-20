import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../services/juego.service';
import { Juego } from '../models/juego';
@Component({
  selector: 'app-page-juegos',
  templateUrl: './page-juegos.component.html',
  styleUrls: ['./page-juegos.component.css']
})
export class PageJuegosComponent implements OnInit {

  constructor(public juegoService: JuegoService) {
  }
  editJuego(juego) {
    this.juegoService.selectedJuego = juego;
  }
  cleanForm() {
    this.juegoService.selectedJuego = new Juego;
  }
  ngOnInit() {
    this.getJuegos();
  }
  getJuegos() {
    this.juegoService.getJuegos()
      .subscribe(res => {
        this.juegoService.juegos = res as Juego[];
        console.log(res);
      })
  }
  addJuego() {
    //console.log(this.juegoService.selectedJuego);
    if (this.juegoService.selectedJuego.id_juego && this.juegoService.selectedJuego.id_juego != '') {
      console.log("aylmao");
      this.juegoService.editJuego(this.juegoService.selectedJuego).subscribe(res => {
        this.getJuegos();
        console.log(res);
      });
    }
    else {
      this.juegoService.addJuego(this.juegoService.selectedJuego).subscribe(res => {
        this.getJuegos();
        console.log(res);
      });
    }
  }
  getImagen(juego) {
    if (juego.imagen) {
      return juego.imagen;
    }
    else {
      return "../../assets/placeholder1.jpg";
    }
  }
  deleteJuego(juego) {
    if (confirm('¿Está segur@ de que quiere eliminar el juego?')) {
      this.juegoService.deleteJuego(juego.id_juego).subscribe(res => {
        this.getJuegos();
        console.log(res);
      });
    }
  }
}
