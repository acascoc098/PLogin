const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register', (req, res) =>{
    res.render('register');
});

router.post('/register', async (req, res) =>{
    const {username, password, email} = req.body;
    const usuario = new User({
        username: username,
        password: bcrypt.hashSync(password, 10),
        email: email
        }
    );
    try {
        await usuario.save();
        res.render('mensaje', {tituloPagina:'Registro usuarios', mensajePagina: 'Usuario registrado'});
    } catch (error) {
        res.render('mensaje', {tituloPagina:'ERROR', mensajePagina: 'Error ' + error});
    }   
});

router.get('/login', (req, res) =>{
    res.render('login');
});

router.post('/login', async (req, res)=>{
    const {username, password} = req.body;

    const usuario = await User.findOne({
        username: username
    });

    if (usuario && bcrypt.compareSync(password, usuario.password)){
        // usuario.password = '1234567890';
        req.session.user = usuario;
        //res.render('mensaje', {tituloPagina:'Login', mensajePagina: 'Usuario logeado'});
        res.redirect('/');
    } else {
        res.render('mensaje', {tituloPagina:'LOGIN', mensajePagina: 'Credenciales no válidas'});
    }
});

router.get('/logout', (req, res)=>{
    req.session.destroy();
    res.redirect('/auth/login');
});

module.exports=router;


/*const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.get('/',(req,res) => {
    res.render('index');
});

router.get('/',(req,res) => {
    res.render('register');
})

router.post('/register', async (req,res) => {
    const {username,password,email} = req.body;
    /*console.log('Username:' + username + 
                '; password: ' + password + 
                '; Email: ' + email)

    const saltedPassword = bcrypt.hashSync(password,10)
    //Lo hacemos para mongo
    const nuevouser = new User({
        username: username,
        password: saltedPassword,
        email: email
    })

    try {
        await nuevouser.save();
        //res.send('Usuario registrado correctamente')
        //Para que se vea más bonito, cambiamos todos los send por esto
        res.render('mensaje', {tituloPagina: 'REGISTRO', mensajePagina: 'Usuario registrado correctamente'})
    } catch (error) {
        //res.send('ERROR: ' + error)
        res.render('mensaje', {tituloPagina: 'REGISTRO', mensajePagina: 'ERROR: ' + error})
    }

    res.send('Datos recibidos correctamente')
})

router.get('/login', (req,res) => {
    res.render('login');
});

router.post('/login', async (req,res) => {
    const {username, password} = req.body;
    const user = await User.findOne(
        {username: username}
    );
    if(user && bcrypt.compareSync(password, user.password)){
        user.password = '';//Para evitar que vean el hash
        req.session.user = user;
        //res.send('Credenciales correctas');
        res.render('mensaje', {tituloPagina: 'LOGIN', mensajePagina: 'Usuario logeado'})
        //res.redirect('auth/')
    } else{
        //res.send('Credenciales incorrectas');
        res.render('mensaje', {tituloPagina: 'LOGIN', mensajePagina: 'ERROR: Usuario no encontrado'})
    };
})

router.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/auth/login');
})

module.exports = router;*/