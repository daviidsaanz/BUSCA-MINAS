import { Tablero } from "./tablero.js";
let filas = 8;
let columnas = 8;
let minas = 8;

export function init() {
    document.getElementById("enviarDimesiones").addEventListener("click", enviarDimensiones);
    document.oncontextmenu = function () { return false; }
    iniciarJuego();
    PrintarNumeroMinas(tablero);
}

function enviarDimensiones() {
    filas = document.getElementById("cuantasFilas").value;
    columnas = document.getElementById("cuantasColumnas").value;
    minas = document.getElementById("cuantasMinas").value;
    iniciarJuego();
}

function iniciarJuego() {
    console.log("Iniciando juego")
    document.getElementById("tablero").innerHTML = "";
    let tablero = new Tablero(filas, columnas, minas);
    mostrarTablero(tablero);
}

function mostrarTablero(tablero) {
    let tableroHTML = document.getElementById("tablero");
    let tabla = document.createElement("table");

    for (let i = 0; i < tablero.filas; i++) {
        let fila = document.createElement("tr");
        for (let j = 0; j < tablero.columnas; j++) {
            let casilla = document.createElement("td");
            casilla.setAttribute("data-fila", i);
            casilla.setAttribute("data-columna", j);
            casilla.addEventListener("click", function () {
                mostrarCelda(i, j, tablero);
            });
            casilla.addEventListener("contextmenu", function () {
                marcarBandera(i, j, tablero);
            });
            casilla.className = "casilla";
            fila.appendChild(casilla);
        }
        tabla.appendChild(fila);
    }
    tableroHTML.appendChild(tabla);
}

function PrintarNumeroMinas(tablero) {
    let matriz = [];
    for (let i = 0; i < tablero.filas; i++) {
        matriz[i] = [];
        for (let j = 0; j < tablero.columnas; j++) {
            if (tablero.tablero[i][j].mina) {
                matriz[i][j] = "Mina";
            } else {
                matriz[i][j] = tablero.tablero[i][j].vecinas;
            }
        }
    }
    console.log(matriz);
}

function mostrarCelda(fila, columna, tablero) {
    if (tablero.tablero[fila][columna].bandera || tablero.juegoTerminado) return;
    if (tablero.tablero[fila][columna].bandera) return;
    if (!tablero.tablero[fila][columna].mina && tablero.tablero[fila][columna].vecinas == 0) {
        tablero.despejarRecursivo(fila, columna);
    } else {
        tablero.tablero[fila][columna].abierta = true;
    }

    actualizarTableroDom(tablero);
    if (tablero.verificarVictoria()) {
        return;
    }
}


function actualizarTableroDom(tablero) {
    const ventanaAncho = 400;
    const ventanaAlto = 600;
    const left = (window.innerWidth - ventanaAncho) / 2;
    const top = (window.innerHeight - ventanaAlto) / 2;
    const colorPalette = ['#B71C1C', '#8B0000', '#6A1B9A', '#4A148C', '#311B92', '#1A237E', '#0D47A1', '#01579B'];
    
    for (let i = 0; i < tablero.filas; i++) {
        for (let j = 0; j < tablero.columnas; j++) {
            let casilla = document.querySelector(`.casilla[data-fila='${i}'][data-columna='${j}']`);
            if (tablero.tablero[i][j].abierta) {
                if (tablero.tablero[i][j].mina) {
                    casilla.textContent = "💣";
                    casilla.style.backgroundColor = "#dd5555";
                    mostrarTodasLasMinas(tablero);
                    window.open("http://127.0.0.1:5500/losepage.html", "_blank", "width=" + ventanaAncho + ",height=" + ventanaAlto + ",left=" + left + ",top=" + top);
                    this.juegoTerminado = true;
                }
                else {
                    if (tablero.tablero[i][j].vecinas > 0) {
                        casilla.textContent = tablero.tablero[i][j].vecinas;
                        casilla.style.color = colorPalette[tablero.tablero[i][j].vecinas - 1];
                        casilla.style.backgroundColor = "#c2c2c2";
                    } else {
                        casilla.style.backgroundColor = "#c2c2c2";
                    }
                }
            }
        }
    }
}





function marcarBandera(fila, columna, tablero) {
    if (tablero.tablero[fila][columna].abierta || tablero.juegoTerminado) return;
    if (tablero.tablero[fila][columna].abierta) return;
    let casilla = document.querySelector(`.casilla[data-fila='${fila}'][data-columna='${columna}']`);
    if (tablero.tablero[fila][columna].bandera) {
        tablero.tablero[fila][columna].bandera = false;
        casilla.innerHTML = "";
    } else {
        tablero.tablero[fila][columna].bandera = true;
        casilla.innerHTML = "🚩";
    }
}

function mostrarTodasLasMinas(tablero) {
    for (let i = 0; i < tablero.filas; i++) {
        for (let j = 0; j < tablero.columnas; j++) {
            if (tablero.tablero[i][j].mina) {
                let casilla = document.querySelector(`.casilla[data-fila='${i}'][data-columna='${j}']`);
                casilla.textContent = "💣";
                casilla.style.backgroundColor = "#dd5555";
            }
        }
    }
}