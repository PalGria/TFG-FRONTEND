import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { JuegoService } from '../services/juego.service';
import { MetricaService } from '../services/metrica.service';
import { VariablesService } from '../services/variables.service';
import { Juego } from '../models/juego';
import { Chart, ChartData, Point } from "chart.js";
import { Metrica } from '../models/metrica';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Variables } from '../models/variables';

@Component({
  selector: 'app-page-metricas',
  templateUrl: './page-metricas.component.html',
  styleUrls: ['./page-metricas.component.css']
})
export class PageMetricasComponent implements OnInit, AfterViewInit {
  chart0: any = [];
  canvases: any = [];
  game: number;
  charts: any = {};
  tipos: any = ['bar-vertical', 'bar-horizontal', 'bar-multiaxis', 'line-basic', 'radar', 'pie', 'doghnut'];
  constructor(private route: ActivatedRoute, public juegoService: JuegoService, public metricaService: MetricaService, public variablesService: VariablesService) {
  }

  async ngOnInit() {
    this.game = +this.route.snapshot.params["id"];
    this.getJuego();
    this.getMetricas();
    this.getVariables();

  }
  ngAfterViewInit() {
    this.getMetricas();
    console.log(this.chart0);
  }

  getVariables() {

    this.variablesService.getVariables()
      .subscribe(res => {
        this.variablesService.variables = res as Variables[];
        console.log(this.variablesService.variables);

      })
  }
  addVariable() {
    //console.log(this.juegoService.selectedJuego);
    if (this.variablesService.selectedVariable.id_metrica_valores && this.variablesService.selectedVariable.id_metrica_valores != '') {
      console.log("aylmao");
      this.variablesService.editVariable(this.variablesService.selectedVariable).subscribe(res => {
        this.getVariables();
        this.cleanVarForm()
        console.log(res);
      });
    }
    else {
      this.variablesService.addVariable(this.variablesService.selectedVariable).subscribe(res => {
        this.getVariables();
        this.cleanVarForm()
        console.log(res);
      });
    }
  }
  getJuego() {
    this.juegoService.getJuego(this.game).subscribe(res => {
      this.juegoService.selectedJuego = (res as Juego)[0];
      console.log(this.juegoService.selectedJuego);
    });
  }
  editVariable(variable) {
    console.log(variable);
    this.variablesService.selectedVariable = variable;
  }
  deleteVariable(variable) {
    console.log(variable);
    if (confirm('¿Está segur@ de que quiere eliminar la variable?')) {
      this.variablesService.deleteVariable(variable.id_metrica_valores).subscribe(res => {
        this.getVariables();
        console.log(res);
      });
    }

  }

  getMetricas(flag = 2) {
    this.canvases = [];
    this.metricaService.getMetricas()
      .subscribe(res => {
        console.log(this.canvases);
        this.metricaService.metricas = res as Metrica[];
        if(this.canvases.length < this.metricaService.metricas.length){
          for (let metrica of this.metricaService.metricas) {
            this.canvases.push(metrica);
          }
        }
        console.log(this.canvases);
        for (let i = 0; i < this.metricaService.metricas.length; i++) {
          console.log("holo");
          this.metricaService.metricas[i].canvas = "canvas" + this.metricaService.metricas[i].id_metrica;
          this.metricaService.metricas[i] = this.crearCharts(this.metricaService.metricas[i]);
        }
        this.chart0 = new Chart('canvas0', {
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
                  beginAtZero: true
                }
              }]
            }
          }
        });
        console.log(this.canvases);
        console.log(this.metricaService.metricas[0].chart);



      });
  }
  cleanVarForm() {
    this.variablesService.selectedVariable = new Variables;
  }
  crearCharts(metrica) {
    metrica.chart = new Chart(metrica.canvas, {
      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [14, 24, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(0, 99, 132, 0.2)',
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
    return metrica;

    /*
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
*/
  }
  addMetrica() {
    this.metricaService.selectedMetrica.juego = this.game;
    if (this.metricaService.selectedMetrica.id_metrica && this.metricaService.selectedMetrica.id_metrica != '') {
      console.log("aylmao");
      let metrica = this.metricaService.selectedMetrica; 
      metrica.chart = []; 
      this.metricaService.editMetrica(metrica).subscribe(res => {
        location.reload();
      });
    }
    else {
      this.metricaService.addMetrica(this.metricaService.selectedMetrica).subscribe(res => {
        location.reload();
      });
    }
  }
  cleanForm() {
    this.metricaService.selectedMetrica = new Metrica;
  }
  editMetrica(metrica) {
    console.log(metrica);
    this.metricaService.selectedMetrica = metrica;
    console.log(this.metricaService.selectedMetrica);
  }
  deleteMetrica(metrica) {
    if (confirm('¿Está segur@ de que quiere eliminar la métrica?')) {
      this.metricaService.deleteMetrica(metrica.id_metrica).subscribe(res => {
        console.log(res);
        location.reload();
      });
    }
    
  }

}
