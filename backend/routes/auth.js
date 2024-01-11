const express = require('express');
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
                '; Email: ' + email)*/
    //Lo hacemos para mongo
    const nuevouser = new User(
        username,
        bcrypt.hashSync(password,10),
        email
    )

    try {
        await nuevouser.save();
        res.send('Usuario registrado correctamente')
    } catch (error) {
        res.send('ERROR: ' + error)
    }

    res.send('Datos recibidos correctamente')
})

module.exports = router;