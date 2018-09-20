import { Component, OnInit, AfterViewInit } from '@angular/core';
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
export class PageMetricasComponent implements OnInit, AfterViewInit {
  game: number;
  charts: any = [];
  tipos: any = ['bar-vertical','bar-horizontal', 'bar-multiaxis','line-basic', 'radar', 'pie','doghnut'];
  constructor(private route: ActivatedRoute, public juegoService: JuegoService, public metricaService: MetricaService) {
  }

  async ngOnInit() {
    console.log(1);
    this.game = +this.route.snapshot.params["id"];
    this.getJuego();
    this.getMetricas();

  }
  ngAfterViewInit() {

  }

  getJuego() {
    this.juegoService.getJuego(this.game).subscribe(res => {
      this.juegoService.selectedJuego = (res as Juego)[0];
      console.log(this.juegoService.selectedJuego);
    });
  }
  getChart() {

  }
  getMetricas() {
    console.log(2);
    this.metricaService.getMetricas()
      .subscribe(res => {
        console.log(3);
        this.metricaService.metricas = res as Metrica[];
        console.log(this.metricaService.metricas);
        for (let metrica of this.metricaService.metricas) {
          metrica.canvas = "canvas" + metrica.id_metrica;
          //this.poblarMetrica(metrica);
        }
        console.log(res);

      })
  }
  crearCharts(metrica) {
    console.log("Hola?");
    metrica.chart = new Chart(metrica.canvas, {
      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: metrica.datosX,
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
              beginAtZero: true
            }
          }]
        }
      }
    });
    //buscamos la metrica y la metemos
    console.log(metrica);
    for (let i = 0; i < this.metricaService.metricas.length; i++) {
      if (this.metricaService.metricas[i].id_metrica == metrica.id_metrica) {
        this.metricaService.metricas[i] = metrica;
        break;
      }
    }
    console.log("Fin de crear metrica?");
    console.log(this.metricaService.metricas);

  }
  async poblarMetrica(metrica) {
    this.metricaService.getValoresMetrica(metrica.id_metrica)
      .subscribe(res => {
        let valores: any = res;

        //COMPROBAMOS SI TENEMOS VALORES EN X Y O Z
        if (valores.result[0]) {
          console.log(valores.result[0]);
          if (valores.result[0].X) {
            metrica.datosX = [];
          }
          if (valores.result[0].Y) {
            metrica.datosY = [];
          }
          if (valores.result[0].Z) {
            metrica.datosZ = [];
          }
          //POBLAMOS LA METRICA
          for (let valor of valores.result) {
            if (valor.X) {
              metrica.datosX.push(valor.X);
            }
            if (valor.Y) {
              metrica.datosY.push(valor.Y);
            }
            if (valor.Z) {
              metrica.datosZ.push(valor.Z);
            }
          }
          this.crearCharts(metrica);
          for (let i = 0; i < this.metricaService.metricas.length; i++) {
            if (this.metricaService.metricas[i].id_metrica == metrica.id_metrica) {
              this.metricaService.metricas[i] = metrica;
              break;
            }
          }
        }
      })
  }
  addMetrica() {
    this.metricaService.selectedMetrica.juego = this.game;
    if (this.metricaService.selectedMetrica.id_metrica && this.metricaService.selectedMetrica.id_metrica != '') {
      console.log("aylmao");
      this.metricaService.editMetrica(this.metricaService.selectedMetrica).subscribe(res => {
        this.getMetricas();
        console.log(res);
      });
    }
    else {
      this.metricaService.addMetrica(this.metricaService.selectedMetrica).subscribe(res => {
        this.getMetricas();
        console.log(res);
      });
    }
  }
  cleanForm() {
    this.metricaService.selectedMetrica = new Metrica;
  }
  editMetrica(metrica){
    console.log(metrica);
    this.metricaService.selectedMetrica = metrica;
    console.log(this.metricaService.selectedMetrica);
  }
  deleteMetrica(metrica) {
    if (confirm('¿Está segur@ de que quiere eliminar la métrica?')) {
      this.metricaService.deleteMetrica(metrica.id_metrica).subscribe(res => {
        this.getMetricas();
        console.log(res);
      });
    }
  }

}
