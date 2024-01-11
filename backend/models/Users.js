const mongoose = require('mongoose');

//Defino esquema
const userFormat = mondgoose.Schema({
    username: { 
        type: String, 
        unique: true, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    email: {
        type: String,
        required: false
    }
});

//Aplico a la clase modelo, equvalente a una calse modelo de java
const User = mongoose.model('User', userFormat);

module.exports = User;