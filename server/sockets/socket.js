const { io } = require('../server');
const  {Usuarios} = require('../Clases/usuarios');
const {crearMensaje} = require('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) =>{
        if (!data.nombre || !data.sala){ //Sino viene el nombre
            return callback({
                err: true,
                mensaje: 'El nombre/sala es necesario'
            })
        }

        client.join(data.sala);

        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala); //El id lo sacamos del client.id

        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));

        callback(personas);

    });

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);

       let mensaje = crearMensaje(persona.nombre, data.mensaje);
       client.broadcast.to(persona.sala).emit('crearMensaje', mensaje)
    });

    client.on('disconnect', () => {
       let personaBorrada = usuarios.borrarPersona(client.id);

       client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} Salio`));
       client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));

    });

    //MENSAJES PRIVADOS
    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersona(client.id); //SABEMOS POR EL ID QUE PERSONA ESTA MANDANDO EL MENSAJE

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    })

});