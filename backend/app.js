const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Como es una APP Web, app es un servidor Web.
const app = express();
const session = require('express-session');

// como los properties de Java
const dotenv = require('dotenv');

// motor de HTML es PUG
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));

// la carpeta public tiene contenido estático
app.use(express.static('public'));

// cargarmos y configuramos el middleware para gestión de sesiones
app.use(session({
    secret: 'misupersecretoquenadiesabe',
    resave: true,
    saveUninitialized: false
}));
app.use((req,res,next)=>{
    res.locals.currentUser = req.session.user;
    if (!req.session.user){        
        if (req.path.startsWith('/auth/login') ||
            req.path.startsWith('/auth/register')){
            // para hacer el GET/POST al login
            next();            
        } else {
            // cuando es una ruta distinta a login
            // me redirecciona al login
            return res.redirect('/auth/login');
        }
    } else {
        // ya estamos logeados
        next();
    }
});

// cargamos configuración desde .env
dotenv.config();
mongoose.connect(process.env.MONGO_URI);

// añadimos las rutas de AUTH.JS
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
// añadimos las rutas de ALUMNOS.JS
const alumnoRoutes = require('./routes/alumnos');
app.use('/alumnos', alumnoRoutes);

// por defecto vamos a /auth
app.get('/', (req, res) => {
    res.redirect('/auth');
});


app.listen(process.env.SERVER_PORT, () => {
    console.log(
        `Servidor en funcionamiento en el puerto ${process.env.SERVER_PORT}`);
});


/*const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//Como es una App Web, app es un servidor Web.
const app = express();

const session = require('express-session');
// para cargar configuración de la APP desde .env
//como los properties de java
const dotenv = require('dotenv');

app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));

//La carpeta public tiene contenido estático
app.use(express.static('public'));

// cargamos configuración desde .env
//dotenv.config();

// Configuración middleware express-session
app.use(session({
    secret: 'supersecretoinconfesable',
    resave: true,
    saveUninitialized: false
}));

 // Middleware para pasar información de sesión a las vistas
app.use((req, res, next) => {
    res.locals.currentUser = req.session.user;
    if(!req.session.user){
        if(req.path.startsWith('/auth/login') ||
        req.path.startsWith('/auth/register')){
            //Para hacer GET/POST al login
            next();
        }else{
            //Cuando la ruta es distinta redirecciona a login
            return res.redirect('/auth/login');
        }
    }else{
        //Ya estamos logeados
        next();
    }
});

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

// sistema de login y registro
//Añadimos rutas de auth y de alumnos
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const alumnoRoutes = require('./routes/alumnos');
app.use('/alumnos', alumnoRoutes);

//Por defecto a auth
app.get('/',(req,res)=>{
    res.redirect('/auth');
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${process.env.SERVER_PORT}`);
});*/