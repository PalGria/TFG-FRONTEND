import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { JuegoService } from '../services/juego.service';
import { Juego } from '../models/juego';

@Component({
  selector: 'app-page-metricas',
  templateUrl: './page-metricas.component.html',
  styleUrls: ['./page-metricas.component.css']
})
export class PageMetricasComponent implements OnInit {
  game: number; 
  constructor(private route: ActivatedRoute, public juegoService: JuegoService) { 

  }

  ngOnInit() {
    this.game = +this.route.snapshot.params["id"];
    this.getJuego();
  }

  getJuego(){
    this.juegoService.getJuego(this.game).subscribe(res => {
      this.juegoService.selectedJuego = (res as Juego)[0]; 
      console.log(this.juegoService.selectedJuego);
    });
  }
}
