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
  selectedMetricaVariables: any = [];
  game: number;
  charts: any = {};
  colores: any = [];
  tipos: any = ['horizontalBar','bar','line', 'radar', 'pie','doghnut'];
  constructor(private route: ActivatedRoute, public juegoService: JuegoService, public metricaService: MetricaService, public variablesService: VariablesService) {
  }

  async ngOnInit() {
    this.initColors();
    this.game = +this.route.snapshot.params["id"];
    this.getJuego();
    this.getMetricas();
    this.getVariables();

  }
  ngAfterViewInit() {
    this.getMetricas();
  }
  initColors() {
    let nombreColor = ['azul', 'verde', 'rojo'];
    let hex = ['#4286f4', '#26ce1a', '#f46242'];
    for (let i = 0; i < nombreColor.length; i++) {
      let color = {
        "nombre": nombreColor[i],
        "hex": hex[i],
      }
      this.colores.push(color);
    }
    console.log(this.colores);

  }
  selectColor(color, variable) {
    variable.color = color; 
    console.log(variable);
    if (variable.id_metrica_valores && variable.id_metrica_valores != '') {
      this.metricaService.editValorToMetrica(variable).subscribe(res => {
        this.getVariables();
        this.cleanVarForm()
        console.log(res);
      });
    }
  }
  getVariables() {

    this.variablesService.getVariables()
      .subscribe(res => {
        this.variablesService.variables = res as Variables[];
        console.log(this.variablesService.variables);

      })
  }
  addVariable() {
    this.variablesService.selectedVariable.juego = this.game;
    if (this.variablesService.selectedVariable.id_metrica_valores && this.variablesService.selectedVariable.id_metrica_valores != '') {
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
  addVariableToMetrica(metrica, valor) {
    this.metricaService.addValorToMetrica(metrica, valor).subscribe(res => {
      //get variables de metrica (pero no metricas)
      this.getVariablesFromMetrica(metrica);
      console.log(res);
    });
  }
  deleteVariableFromMetrica(valor) {
    this.metricaService.deleteValorFromMetrica(valor.id_relacion).subscribe(res => {
      console.log(res)
      this.getVariablesFromMetrica(this.metricaService.selectedMetrica);

    });
  }
  getJuego() {
    this.juegoService.getJuego(this.game).subscribe(res => {
      this.juegoService.selectedJuego = (res as Juego)[0];
    });
  }
  editVariable(variable) {
    this.variablesService.selectedVariable = variable;
  }
  deleteVariable(variable) {
    if (confirm('¿Está segur@ de que quiere eliminar la variable?')) {
      this.variablesService.deleteVariable(variable.id_metrica_valores).subscribe(res => {
        this.getVariables();
        console.log(res);
      });
    }

  }

  getMetricas(flag = 2) {
    this.canvases = [];
    this.metricaService.getMetricasFromJuego(this.game)
      .subscribe(res => {
        this.metricaService.metricas = res as Metrica[];
        if (this.canvases.length < this.metricaService.metricas.length) {
          for (let metrica of this.metricaService.metricas) {
            this.canvases.push(metrica);
          }
        }
        for (let i = 0; i < this.metricaService.metricas.length; i++) {
          this.metricaService.metricas[i].canvas = "canvas" + this.metricaService.metricas[i].id_metrica;
          this.crearCharts(this.metricaService.metricas[i]);
        }

        console.log(this.canvases);

      });
  }
  cleanVarForm() {
    this.variablesService.selectedVariable = new Variables;
  }
  crearCharts(metrica) {
    console.log(metrica);
    this.metricaService.getValoresFromMetrica(metrica).subscribe(res => {
      console.log(res);
      metrica.variables = res;
      let nombres = [];
      let colores = []; 
      let datos = []; 
      for (let variable of metrica.variables){
        nombres.push (variable.nombre);
        colores.push(variable.color_rel);
        datos.push(variable.X);

      } 
      console.log(metrica);
      metrica.chart = new Chart(metrica.canvas, {
        type: metrica.tipo,
        data: {
          labels: nombres,
          datasets: [{
            label: '',
            data: datos,
            backgroundColor: colores,
            borderColor: colores,
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

    });

    /*
    //buscamos la metrica y la metemos
    fog(metrica);
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
      let metrica = this.metricaService.selectedMetrica;
      metrica.chart = [];
      this.metricaService.editMetrica(metrica).subscribe(res => {
        location.reload();
      });
    }
    else {
      this.metricaService.addMetrica(this.metricaService.selectedMetrica).subscribe(res => {
        //console.log(res);
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
    this.getVariablesFromMetrica(metrica);
    console.log(this.metricaService.selectedMetrica);
  }
  getVariablesFromMetrica(metrica) {
    this.metricaService.getValoresFromMetrica(metrica).subscribe(res => {
      console.log(res);
      this.selectedMetricaVariables = res;
    });
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
