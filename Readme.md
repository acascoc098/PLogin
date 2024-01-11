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