import { Casilla } from "./casilla.js";
export class Tablero {
    constructor(filas, columnas, minas) {
        this.filas = filas;
        this.columnas = columnas;
        this.minas = minas;
        this.tablero = [];
        this.juegoTerminado = false;
        this.generaTablero();
        this.posicionaBombas();
        this.contarMinasCercanas();
    }

    generaTablero() {
        for(let i = 0; i < this.filas; i++){    
            this.tablero[i] = [];
            for(let j = 0; j < this.columnas; j++){
                this.tablero[i][j] = new Casilla(i, j);
            }
        }
    }

    posicionaBombas() {
        let minas = this.minas; 
        while(minas > 0){
            let x = Math.floor(Math.random() * this.filas);
            let y = Math.floor(Math.random() * this.columnas);
            if(!this.tablero[x][y].mina){
                this.tablero[x][y].mina = true;
                minas--;
            }
        }
    }

    contarMinasCercanas() {
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                if (!this.tablero[i][j].mina) {
                    let minasCercanas = 0;
                    for (let k = i - 1; k <= i + 1; k++) {
                        for (let l = j - 1; l <= j + 1; l++) {
                            if (k >= 0 && k < this.filas && l >= 0 && l < this.columnas && this.tablero[k][l].mina) {
                                minasCercanas++;
                            }
                        }
                    }
                    this.tablero[i][j].vecinas = minasCercanas;
                }
            }
        }
    }

    despejarRecursivo(fila, columna) {
        if (this.tablero[fila][columna].abierta) {
            return;
        }

        this.tablero[fila][columna].abierta = true;

        if (this.tablero[fila][columna].vecinas === 0) {
            const arrayPos_I = [-1, 0, 1];
            const arrayPos_J = [-1, 0, 1];

            for (const posi of arrayPos_I) {
                for (const posj of arrayPos_J) {
                    const nuevaFila = fila + posi;
                    const nuevaColumna = columna + posj;

                    if (nuevaFila >= 0 && nuevaFila < this.filas && nuevaColumna >= 0 && nuevaColumna < this.columnas) {
                        this.despejarRecursivo(nuevaFila, nuevaColumna);
                    }
                }
            }
        }
    }

    verificarVictoria() {
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                if (!this.tablero[i][j].mina && !this.tablero[i][j].abierta) {
                    return false; 
                }
            }
        }
        alert("¡Felicidades, has ganado!");
        this.juegoTerminado = true; 
        return true;
    }
    
    

}