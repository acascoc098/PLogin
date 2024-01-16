const mongoose = require('mongoose');

//Defino esquema
const userFormat = mongoose.Schema({
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
    }/*,{
        statics: {
            finByEmail(email){
                return Find(email: email)
            }
        }
    }*/
);

//Aplico a la clase modelo, equvalente a una calse modelo de java
const User = mongoose.model('User', userFormat);

module.exports = User;