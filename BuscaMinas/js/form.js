function Enviar() {
    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const nick = document.querySelector('#nick').value;
    const fechaNacimiento = document.querySelector('#fechaNacimiento').value;
    const email = document.querySelector('#email').value;
    const contrasena = document.querySelector('#contrasena').value;

    if (calcularEdad(fechaNacimiento) >= 18) {
        guardarDatosEnCookies(nombre, apellido, nick, fechaNacimiento, email);
        window.opener.postMessage("ventana_cerrada", "*");
        window.close();
    } else {
        alert("Debes ser mayor de 18 años para jugar.");
    }
}

function calcularEdad(fecha){
    let fechaNacimiento = new Date(fecha);
    let hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    let mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if(mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())){
        edad--;
    }
    return edad;
}

function guardarDatosEnCookies(nombre, apellido, nick, fechaNacimiento, email) {
    const cookieData = {
        nombre: nombre,
        apellido: apellido,
        nick: nick,
        fechaNacimiento: fechaNacimiento,
        email: email
    };
    const cookieString = JSON.stringify(cookieData);
    document.cookie = "formData=" + cookieString + "; expires=Thu, 18 Dec 2035 12:00:00 UTC; path=/";
}
