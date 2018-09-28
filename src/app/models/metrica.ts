export class Metrica {

    constructor(id_metrica = '', nombre = '',tipo = '' , juego = 0 , data_created = new Date()){
        this.id_metrica = id_metrica;
        this.nombre = nombre;
        this.tipo = tipo;
        this.juego = juego;
        this.data_created = data_created;
        this.chart = {};
        this.canvas = "";
        this.variables = []; 
    }

    id_metrica: string;
    nombre: string;
    tipo: string;
    juego: number;
    data_created: Date;
    variables: any; 
    chart: any;
    canvas: string; 

}
