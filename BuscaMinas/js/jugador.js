export class Jugador{
    #edad;
    nombre;
    apellido;
    nick;
    fechaNacimiento;
    email;
    contrasena;

    constructor(nombre, apellido, nick, fechaNacimiento, email, contrasena ){
        this.nombre = nombre;
        this.apellido = apellido;
        this.nick = nick;
        this.fechaNacimiento = fechaNacimiento;
        this.email = email;
        this.contrasena = contrasena;

    }
    
    get edad(){
        return this.#edad;
    }

    set edad(edad){
        this.#edad = edad;
    }

    calcularEdad(){
        let fechaNacimiento = new Date(this.fechaNacimiento);
        let hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        let mes = hoy.getMonth() - fechaNacimiento.getMonth();
        if(mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())){
            edad--;
        }
        this.edad = edad;
    }
}