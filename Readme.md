# GESTIÓN ACADÉMICA CON MONGO Y EXPRESS

Proyecto de ejemplo con NodeJS, Mongoose, Mongo, Express, Express-session y dotenv.

Con el patrón MVC (_Modelo-Vista-Controlador_).

**`¡No olvides!`** Crear un archivo .env en la carpeta backend con el formato:

```
MONGO_URI=mongodb://root:83uddjfp0cmMD@localhost:27017/GestionAcademica?authSource=admin
BACKEND_PORT=8000
```

Donde `MONGO_URI` es la URL de conexión a Mongo y `BACKEND_PORT` es el puerto donde corre el servidor.

Creamos el modelo de datos para el ususatio `models/Users.js`.

```
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
```

## Rutas de AUTH

RUTA | MÉTODO | OBSERVACIONES
-----|--------|--------------
/auth | GET | Ventana bienvenida auto
/auth/register GET | Mostrar formulario resgistro
/auth/register | POST | Guardar datos formulario registro
/auth/login | GET   | Mostrar formulario login
/auth/login |POST   |   Guaradar datos formulario login

Este fichero tiene la información para hacer la autenticación.