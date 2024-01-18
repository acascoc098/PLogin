const mongoose = require('mongoose');

//Defino esquema
const alumnoSchema = mongoose.Schema({
        nombre: { 
            type: String, 
            unique: false, 
            required: true 
        },
        apellido: { 
            type: String, 
            unique: false, 
            required: true 
        },
        telefono: { 
            type: Number, 
            unique: true,
            required: true 
        },
        email: {
            type: String,
            unique: true,
            required: true
        }
    }
);

//Aplico a la clase modelo, equvalente a una calse modelo de java
const Alumno = mongoose.model('Alumno', alumnoSchema);

module.exports = Alumno;