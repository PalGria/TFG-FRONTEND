import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { JuegoService } from '../services/juego.service';
import { MetricaService } from '../services/metrica.service';
import { Juego } from '../models/juego';
import { Chart, ChartData, Point } from "chart.js";
import { Metrica } from '../models/metrica';

@Component({
  selector: 'app-page-metricas',
  templateUrl: './page-metricas.component.html',
  styleUrls: ['./page-metricas.component.css']
})
export class PageMetricasComponent implements OnInit {
  game: number; 
  charts : any = []; 
  constructor(private route: ActivatedRoute, public juegoService: JuegoService, public metricaService: MetricaService) { 

  }

  ngOnInit() {
    this.game = +this.route.snapshot.params["id"];
    this.getJuego();
    this.getMetricas();
    this.charts[0] = {};
    this.charts[1] = {};
    this.charts[0].canvas ='canvas1';
    this.charts[1].canvas ='canvas2';
    this.charts[0].chart = [];
    this.charts[1].chart = [];
  

  }
  ngAfterViewInit(){
    let chart1 = new Chart('canvas1', {
      type: 'bar',
      data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
  let chart2 = new Chart('canvas2', {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
  this.charts[0].chart = chart1;
  this.charts[1].chart = chart2;
  }
  getJuego(){
    this.juegoService.getJuego(this.game).subscribe(res => {
      this.juegoService.selectedJuego = (res as Juego)[0]; 
      console.log(this.juegoService.selectedJuego);
    });
  }
  getMetricas() {
    this.metricaService.getMetricas()
      .subscribe(res => {
        this.metricaService.metricas = res as Metrica[];
        for(let metrica of this.metricaService.metricas){
            this.poblarMetrica(metrica);
        }
        console.log(res);

      })
  }
  poblarMetrica(metrica){
    this.metricaService.getValoresMetrica(metrica.id_metrica)
    .subscribe(res => {
        let valores : any = res;

        console.log(valores);
        if(valores.result[0].X){
            metrica.datosX = [];
        }
        if(valores.result[0].Y){
            metrica.datosY = [];
        }
        if(valores.result[0].Z){
            metrica.datosZ = [];
        }
        for (let valor of valores.result){
            if(valor.X){
                metrica.datosX.push (valor.X);
            }
            if(valor.Y){
                metrica.datosY.push (valor.Y);
            }
            if(valor.Z){
                metrica.datosZ.push (valor.Z);
            }
        }
        for (let i = 0; i < this.metricaService.metricas.length ; i++){
            if(this.metricaService.metricas[i].id_metrica == metrica.id_metrica){
                this.metricaService.metricas[i] = metrica;
                break;
            }
        }
      })
  }
}
