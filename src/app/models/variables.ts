export class Variables {

    constructor(id_metrica_valores = '', nombre = '',tipo = '' ,  juego = 0 , data_created = new Date()){
        this.id_variable = id_metrica_valores;
        this.nombre = nombre;
        this.juego = juego;
        this.data_created = data_created;
        this.X = [];
        this.Y = [];
        this.Z = [];
    }
    id_variable: string;
    nombre: string;
    juego: number;
    data_created: Date;
    X: any;
    Y: any;
    Z: any;
}
