const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const conexion = require('./db');   // modulo local db

// Inicializar la app de Express 
const app = express();
app.use(cors());
app.use(bodyParser.json());

// usar los archivos estáticos (HTML, CSS, JS) 
app.use(express.static('src'));

// Rutas de la API

// Obtener todas las personas 
app.get('/pet', (req, res) => {
    conexion.query('SELECT * FROM pet', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Crear una nueva persona 
app.post('/pet', (req, res) => {
    const { nombre, apellido, correo, telefono } = req.body;
    const sql = 'INSERT INTO pet (nombre, apellido, correo, telefono) VALUES (?, ?, ?, ?)';
    conexion.query(sql, [nombre, apellido, correo, telefono], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id: result.insertId, nombre, apellido, correo, telefono });
    });
});

// Eliminar una persona 
app.delete('/pet/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM pet WHERE id = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'mascota eliminada' });
    });
});

// Actualizar una persona 
app.put('/pet/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo, telefono } = req.body;
    const sql = 'UPDATE person SET nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE id = ?';

    conexion.query(sql, [nombre, apellido, correo, telefono, id], (err,
        result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'mascota actualizada' });
    });
});

// Iniciar el servidor
app.listen(3007, () => {
    console.log('Servidor escuchando en http://localhost:3007');
});
