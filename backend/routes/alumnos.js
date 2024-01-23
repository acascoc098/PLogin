const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Alumno = require('../models/Alumno');

// muestra en una tabla la lista de alumnos
router.get('/', async(req, res) => {
    const listado = await Alumno.find({});
    res.render('alumnos/index', {alumnos: listado});
});

// muestra el formulario alta alumno
router.get('/create', (req, res) =>{
    res.render('alumnos/create')
});

// guarda el alumno en la BBDD
router.post('/create', async (req, res) =>{
    const {nombre, apellido, telefono, email} = req.body;
    const alumno = new Alumno({
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        email: email
    });
    try {
        await alumno.save();
        res.redirect('/alumnos');
    } catch (error) {
        res.render('mensaje', {mensajePagina: 'ERROR: ' + 
            'El correo electrónico o el teléfono proporcionado ya existía en la base de datos.'})
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const alumno = await Alumno.findById(req.params.id);
        if (alumno)
            res.render('alumnos/edit', {alumno: alumno});
        else
            res.render('mensaje', {mensajePagina:'No encuentro ese alumno en la base de datos'});
    } catch {
        res.render('mensaje', {mensajePagina: 'Error al intentar editar alumno'});
    }

});

router.post('/edit/:id', async (req, res) => {
    try {
        const {nombre, apellido, telefono, email} = req.body;
        await Alumno.findOneAndUpdate({_id: req.params.id},{
            nombre:nombre,
            apellido: apellido,
            telefono: telefono,
            email: email
        });
        res.redirect('/alumnos');
    } catch {
        res.render('mensaje', {mensajePagina: 'Error al intentar editar alumno'});
    }

});

router.get('/delete/:id', async (req, res) => {
    try {
        const alumno = await Alumno.findById(req.params.id);
        if (alumno)
            res.render('alumnos/delete', {alumno: alumno});
        else
            res.render('mensaje', {mensajePagina:'No encuentro ese alumno en la base de datos'});
    } catch {
        res.render('mensaje', {mensajePagina: 'Error al intentar eliminar alumno'});
    }

});

router.post('/delete/:id', async (req, res) => {
    try {
        const {nombre, apellido, telefono, email} = req.body;
        await Alumno.findByIdAndDelete(req.params.id);
        res.redirect('/alumnos');
    } catch {
        res.render('mensaje', {mensajePagina: 'Error al intentar eliminar alumno'});
    }

});

module.exports=router;


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
//module.exports = router;