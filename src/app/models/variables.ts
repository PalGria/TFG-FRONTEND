export class Variables {

    constructor(id_variable = '', nombre = '',tipo = '' ,  juego = 0 , data_created = new Date()){
        this.id_variable = id_variable;
        this.nombre = nombre;
        this.tipo = tipo;
        this.juego = juego;
        this.data_created = data_created;
        this.X = [];
        this.Y = [];
        this.Z = [];
    }
    id_variable: string;
    nombre: string;
    tipo: string;
    juego: number;
    data_created: Date;
    X: any;
    Y: any;
    Z: any;
}
