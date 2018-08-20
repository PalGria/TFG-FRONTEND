export class Juego {

    constructor(id_juego = '', titulo = '',imagen = '' , data_created = new Date()){
        this.id_juego = id_juego;
        this.titulo = titulo;
        this.imagen = imagen;
        this.data_created = data_created;
    }

    id_juego: string;
    titulo: string;
    imagen: string;
    data_created: Date;
}
