const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const conexion = require('./db');   // modulo local db

// Inicializar la app de Express 
const app = express();

// Middleware 
app.use(cors());
app.use(bodyParser.json());

// usar los archivos estáticos (HTML, CSS, JS) 
app.use(express.static('src'));

// Rutas de la API

// Obtener todas las mascotas
app.get('/pet/read', (req, res) => {
    conexion.query('SELECT * FROM pet', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Crear mascota 
app.post('/pet/post', (req, res) => {
    const { nombre, apellido, correo, telefono } = req.body;
    const sql = 'INSERT INTO pet (nombre, apellido, correo, telefono) VALUES (?, ?, ?, ?)';
    conexion.query(sql, [nombre, apellido, correo, telefono], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id: result.insertId, nombre, apellido, correo, telefono });
    });
});

// Eliminar mascota
app.delete('/pet/delete', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM pet WHERE id = ?';
    conexion.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'pet deleted' });
    });
});

// Actualizar mascota
app.put('/pet/put', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo, telefono } = req.body;
    const sql = 'UPDATE person SET nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE id = ?';

    conexion.query(sql, [nombre, apellido, correo, telefono, id], (err,
        result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'pet updated' });
    });
});

// Iniciar el servidor
app.listen(3007, () => {
    console.log('Server listening on http://localhost:3007');
});
