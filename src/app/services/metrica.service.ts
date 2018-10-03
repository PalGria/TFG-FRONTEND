import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Metrica } from '../models/metrica';


@Injectable({
  providedIn: 'root'
})
export class MetricaService {
  selectedMetrica: Metrica;
  metricas: Metrica[];
  readonly URL_API = 'http://localhost:3000/api/metricas';
  readonly URL_API2 = 'http://localhost:3000/api/relacionesMetricas'

  constructor(private http: HttpClient) {
    this.selectedMetrica = new Metrica();
   }
   getMetricas(){
    return this.http.get(this.URL_API);
  }
  getMetrica(id){
    return this.http.get(this.URL_API + `/${id}`);
  }
  addMetrica(metrica){
    return this.http.post(this.URL_API, metrica);
  }
  addValorToMetrica(metrica, valor){
    return this.http.post(this.URL_API + `/${metrica.id_metrica}/valores`, valor);
  }
  editValorToMetrica(variable){
    return this.http.put(this.URL_API + `/${variable.id_relacion}/valores`, variable);
  }
  deleteValorFromMetrica(id){
    console.log(id);
    return this.http.delete(this.URL_API + `/valores/${id}`);
  }
  getValoresFromMetrica(metrica){
    return this.http.get(this.URL_API + `/${metrica.id_metrica}/valores`);
  }
  editMetrica(metrica){
    return this.http.put(this.URL_API + `/${metrica.id_metrica}`, metrica);
  }
  deleteMetrica(id){
    return this.http.delete(this.URL_API + `/${id}`);
  }
  getValoresMetrica(id){
    return this.http.get(this.URL_API + `/${id}/valores`);
  }
}
