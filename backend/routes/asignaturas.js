const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Asignatura = require('../models/Asignatura');

// muestra en una tabla la lista de alumnos
router.get('/', async(req, res) => {
    const listado = await Asignatura.find({});
    res.render('asignaturas/index', {asignaturas: listado});
});

// muestra el formulario alta alumno
router.get('/create', (req, res) =>{
    res.render('asignaturas/create')
});

// guarda el alumno en la BBDD
router.post('/create', async (req, res) =>{
    const {nombre, cuatrimestre, curso} = req.body;
    const asignatura = new Asignatura({
        nombre: nombre,
        cuatrimestre: cuatrimestre,
        curso: curso
    });
    try {
        await asignatura.save();
        res.redirect('/asignaturas');
    } catch (error) {
        res.render('mensaje', {mensajePagina: 'ERROR: ' + 
            'La asignatura ya existía en la base de datos.'})
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const asignatura = await Asignatura.findById(req.params.id);
        if (asignatura)
            res.render('asignaturas/edit', {asignatura: asignatura});
        else
            res.render('mensaje', {mensajePagina:'No encuentro esa asignatura en la base de datos'});
    } catch {
        res.render('mensaje', {mensajePagina: 'Error al intentar editar asignatura 1'});
    }

});

router.post('/edit/:id', async (req, res) => {
    try {
        const {nombre, cuatrimestre, curso} = req.body;
        await Asignatura.findOneAndUpdate({
            nombre: nombre,
            cuatrimestre: cuatrimestre,
            curso: curso
        });
        res.redirect('/asignaturas');
    } catch {
        res.render('mensaje', {mensajePagina: 'Error al intentar editar asignatura'});
    }

});

router.get('/delete/:id', async (req, res) => {
    try {
        const asignatura = await Asignatura.findById(req.params.id);
        if (asignatura)
            res.render('asignaturas/delete', {asignatura: asignatura});
        else
        res.render('mensaje', {mensajePagina:'No encuentro esa asignatura en la base de datos'});
    } catch {
        res.render('mensaje', {mensajePagina: 'Error al intentar eliminar asignatura'});
    }

});

router.post('/delete/:id', async (req, res) => {
    try {
        await Asignatura.findByIdAndDelete(req.params.id);
        res.redirect('/asignaturas');
    } catch {
        res.render('mensaje', {mensajePagina: 'Error al intentar eliminar asignatura'});
    }

});

module.exports=router;