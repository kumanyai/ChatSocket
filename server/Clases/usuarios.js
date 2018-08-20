/*
* id: 'wedsadsa',
* nombre: 'Alex',
* sala: 'videojuegos'
* */


class Usuarios{ //Creamos nuestra clase usuario
    constructor(){ //Metodo principal para incializar nuestra clase.
        this.personas = []; //Variables que estaran disponibles en el scope global de la clase
    }

    agregarPersona(id, nombre, sala){ //Metodo de Agregar Persona - Recibimos el ID y el NOMBRE de la persona
        let persona ={ //Creamos una persona
            id,
            nombre,
            sala
        };
        this.personas.push(persona); //La agregamos al arreglo
        return this.personas; //Retornamos el arreglo de persona

    }

    getPersona(id){//Obtener una persona en particular mediante el ID de la persona
        let persona = this.personas.filter(persona => {//Buscamos en el arreglo de personas los que coincidan con el id que le pasamos y regresa un nuevo arreglo. NOTA: un = es una asignacion y === es una comparación
            return persona.id === id
        })[0];//Necesitamos la primera posicion por eso es 0 para que sea un unico registro y nos lo regrese

        return persona; //Si encuentra una persona obtendremos un objeto de lo contrario nos devolvera undefined o null
    }

    getPersonas(){ //OBETNER TODAS LAS PERSONAS
        return this.personas;
    }

    getPersonasPorSala(sala){
        let personasEnSala = this.personas.filter(persona => {
            return persona.sala === sala;
        });
        return personasEnSala;
    }

    borrarPersona(id){ //Metodo para borrar a una persona por id

        let personaBorrada = this.getPersona(id);//GUARDAMOS LA REFERENCIA DE LA PERSONA QUE VAMOS A BORRAR

        this.personas = this.personas.filter(persona => { //
            return persona.id =! id; //Retornamos un nuevo arreglo con el id distinto al que estan enviando Es decir borramos a la persona
        });//
        // this.personas = this.personas.filter(persona => persona.id =! id); //ES LO MISMO QUE LA FUNCION DE ARRIBA
        return personaBorrada;//Retorno a la persona que se acaba de borrar
    }

}

module.exports = {
    Usuarios
};