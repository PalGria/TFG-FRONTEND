export class Metrica {

    constructor(id_metrica = '', nombre = '',tipo = '' , juego = 0 , data_created = new Date()){
        this.id_metrica = id_metrica;
        this.nombre = nombre;
        this.tipo = tipo;
        this.juego = juego;
        this.data_created = data_created;
        this.datosX = [];
        this.datosY = [];
        this.datosZ = [];
        this.chart = [];
        this.canvas = "";
    }

    id_metrica: string;
    nombre: string;
    tipo: string;
    juego: number;
    data_created: Date;
    datosX: any;
    datosY: any;
    datosZ: any;
    chart: any;
    canvas: string; 

}
