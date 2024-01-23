const mongoose = require('mongoose');

//Defino esquema
const asignaturaSchema = mongoose.Schema({
        nombre: { 
            type: String, 
            unique: false, 
            required: true 
        },
        cuatrimestre: { 
            type: String, 
            unique: false, 
            required: true 
        },
        curso: { 
            type: String, 
            unique: true,
            required: true 
        }
    }
);

//Aplico a la clase modelo, equvalente a una calse modelo de java
const Asignatura = mongoose.model('Asignatura', asignaturaSchema);

module.exports = Asignatura;