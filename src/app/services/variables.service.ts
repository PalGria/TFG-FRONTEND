import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Variables } from '../models/variables';


@Injectable({
  providedIn: 'root'
})
export class VariablesService {
  selectedVariable: Variables;
  variables: Variables[];
  readonly URL_API = 'http://localhost:3000/api/valores';

  constructor(private http: HttpClient) {
    this.selectedVariable = new Variables();
   }
   getVariables(){
    return this.http.get(this.URL_API);
  }
  getVariable(id){
    return this.http.get(this.URL_API + `/${id}`);
  }
  addVariable(variable){
    return this.http.post(this.URL_API, variable);
  }
  editVariable(variable){
    return this.http.put(this.URL_API + `/${variable.id_metrica_valores}`, variable);
  }
  deleteVariable(id){
    return this.http.delete(this.URL_API + `/${id}`);
  }

}
