export class Casilla {
    constructor (fila, columna){
        this.fila = fila;
        this.columna = columna;
        this.mina = false;
        this.bandera = false;
        this.vecinas = 0;
        this.abierta = false;
    }
}