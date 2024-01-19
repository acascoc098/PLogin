const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Alumno = require('../models/Alumno');

//Muestra la lista de alumnos
router.get('/', async(req, res) => {
    const listado = await Alumno.find({});
    res.render('alumnos/index', {alumnos: listado});
});

//Formulario para dar de alta
router.get('create', (req, res) => {
    res.render('alumnos/create')
});
//Guarda el alumno
router.post('create', async(req, res) => {
    const {nombre,apellido,telefono,email} = req.body;
    const nuevoalumno = new alumno({
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        email: email
    });
    try {
        await nuevoalumno.save()
        res.redirect('/');
    } catch (error) {
        res.render('mensaje', {mensajePagina: "Error"+ error})
    }
    res.redirect('/');
});

//Formulario para editar el alumno
router.get('/edit/:id', async(req,res) => {
    try{
        const alumno = await alumno.findById(req.params.id);
        if(alumno){
            res.render('alumnos/edit', {alumno: alumno})
        }else{
            res.render('mensaje', {mensajePagina: "No se pudo encontrar ese alumno en la base de datos"})
        }
    }catch (error){
        res.render('mensaje', {mensajePagina: "Error al intentar editar el alumno"+ error})
    }
});

/*const express = require('express');
const router = express.Router();
const Alumno = require('../models/Alumno');

// Obtener todos los alumnos
router.get('/alumnos', async (req, res) => {
    try {
        const alumnos = await Alumno.find();
        res.render('alumnos/index', { alumnos });
    } catch (error) {
        res.send('Error al obtener los alumnos');
    }
});

// Formulario para agregar un nuevo alumno
router.get('/alumnos/new', (req, res) => {
    res.render('alumnos/new');
});

// Agregar un nuevo alumno
router.post('/alumnos', async (req, res) => {
    const { nombre, apellidos, email } = req.body;

    const nuevoAlumno = new Alumno({ nombre, apellidos, email });

    try {
        await nuevoAlumno.save();
        res.redirect('/alumnos');
    } catch (error) {
        res.send('Error al agregar el alumno');
    }
});

// Mostrar detalles de un alumno
router.get('/alumnos/:id', async (req, res) => {
    try {
        const alumno = await Alumno.findById(req.params.id);
        res.render('alumnos/show', { alumno });
    } catch (error) {
        res.send('Error al obtener los detalles del alumno');
    }
});

// Formulario para editar un alumno
router.get('/alumnos/:id/edit', async (req, res) => {
    try {
        const alumno = await Alumno.findById(req.params.id);
        res.render('alumnos/edit', { alumno });
    } catch (error) {
        res.send('Error al obtener los detalles del alumno para editar');
    }
});
// Actualizar un alumno
router.put('/alumnos/:id', async (req, res) => {
    const { nombre, apellidos, email } = req.body;
    try {
        await Alumno.findByIdAndUpdate(req.params.id, { nombre,apellidos, email });
        res.redirect('/alumnos');
    } catch (error) {
        res.send('Error al actualizar el alumno');
    }
});

// Eliminar un alumno
router.delete('/alumnos/:id', async (req, res) => {
    try {
        await Alumno.findByIdAndRemove(req.params.id);
        res.redirect('/alumnos');
    } catch (error) {
        res.send('Error al eliminar el alumno');
    }
});
*/
module.exports = router;