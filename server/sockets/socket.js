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

        usuarios.agregarPersona(client.id, data.nombre, data.sala);
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${ data.nombre } se unió`));

        callback(usuarios.getPersonasPorSala(data.sala));

    });

    client.on('crearMensaje', (data, callback) => {

        let persona = usuarios.getPersona(client.id);
        
        try{
            let mensaje = crearMensaje(persona.nombre, data.mensaje);
            client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

            callback(mensaje);
        }catch (e) {
            
        }
        
    });

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);
        try {
            client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} Salio`));
            client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));
        }catch (e) {

        }

    });

    //MENSAJES PRIVADOS
    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersona(client.id); //SABEMOS POR EL ID QUE PERSONA ESTA MANDANDO EL MENSAJE

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    })

});