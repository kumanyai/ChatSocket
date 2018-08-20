var socket = io();

//==============================
// Obtenemos el nombre que venga
//==============================
var params = new URLSearchParams(window.location.search);
if (!params.has('nombre') || !params.has('sala')){
    window.location = 'index.html'; //Redireccionamos al index.html
    throw new Error('El nombre y sala son necesarios');
}

var usuario = { //obtenemos el nombre que venga por los paramentros y lo contruimos
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

//==========================
// CUANDO SE CONECTAN AL API
//==========================
socket.on('connect', function() { //Cuando un usuario se conecta
    console.log('Conectado al servidor');

    socket.emit('entrarChat',usuario, function (resp) {//le mandamos al backend quien se esta conectando
        console.log('Usuarios Conectados', resp);
    })
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//Escuchar cambios de usuarios
//Cuando un usuario entra o sale del chat

socket.on('listaPersona', function(personas) {

    console.log(personas);

});

//Mensaje Privados - ACCION DEL CLIENTE DE ESCUCHAR UN MENSAJE PRIVADO
socket.on('mensajePrivado', function (mensaje) {
    console.log('Mensaje Privado', mensaje);
});