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
