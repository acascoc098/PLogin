const express = require('express');
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
dotenv.config();

// Configuración middleware express-session
app.use(session({
    secret: 'supersecretoinconfesable',
    resave: true,
    saveUninitialized: false
}));

 // Middleware para pasar información de sesión a las vistas
app.use((req, res, next) => {
    res.locals.currentUser = req.session.user;
    next();
});

mongoose.connect(process.env.MONGO_URI);

// sistema de login y registro
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

app.get('/',(req,res)=>{
    res.redirect('/auth');
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${process.env.SERVER_PORT}`);
});