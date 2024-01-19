# GESTIÓN ACADÉMICA CON MONGO Y EXPRESS

Proyecto de ejemplo con NodeJS, Mongoose, Mongo, Express, Express-session y dotenv.

```
-> CREACIÓN DE CONTENEDORES
docker-compose up -d

-> ARRANCAMOS LOS CONTENEDORES
docker-compose start

-> BORRAR LOS CONTENEDORES
docker-compose down

-> BORRAMOS
docker volume prune

-> BORRAMOS LAS IMÁGENES PARA BORRAR DEL
docker image rm mongo mongo-express
```

En la carpeta `stack-mongo` creamos un archivo .env con las credenciales:

```
MONGO_USER=root
MONGO_PASSWORD=83uddjfp0cmMD
MONGO_PORT=27017
EXPRESS_USER=mongo
EXPRESS_PASSWORD=83uddjfp0cmMD
EXPRESS_PORT=8081
```



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
/alumnos | GET | Mostrar tabla lisa de alumnos
/alumnos/list/(id) | GET | Mostrar alumno con ID
/alumnos/create | GET | Mostrar formulario para añadir
/alumnos/create | POST | Guardar info del alumno nuevo
/alumnos/edit/(id) | GET | Mostrar formulario para editar alumno con ID
/alumnos/edit/(id) | POST | Guardar info del alumno con ID
/alumnos/delete/(id) | GET | Mostrar formulario para eliminar alumno con ID
/alumnos/delete/(id) | POST | Borrar alumno con ID

Este fichero tiene la información para hacer la autenticación.