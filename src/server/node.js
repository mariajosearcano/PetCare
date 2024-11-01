// api

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


// rutas api para usuarios

// obtener todas las personas
app.get('/person/read', (req, res) => {
    conexion.query('SELECT * FROM person', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// crear una persona
app.post('/person/create', (req, res) => {
    const { document,name,last_name,email,password,phone_number } = req.body;
    const sql = 'INSERT INTO person (document,name,last_name,email,password,phone_number) VALUES (?, ?, ?, ?, ?, ?)';    // el id se genera automaticamente
    conexion.query(sql, [document,name,last_name,email,password,phone_number], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id: result.insertId, document,name,last_name,email,password,phone_number });
    });
});

// obtener una persona
app.get('/person/read/:document', (req, res) => {
    const document = req.params.document;
    const sql = 'SELECT * FROM person WHERE document = ?';
    
    conexion.query(sql, [document], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }
        
        res.json(results[0]);
    });
});

// actualizar una persona
app.put('/person/update/:document', (req, res) => {
    const { document, name, last_name, email, password, phone_number } = req.body;
    
    const sql = `
        UPDATE person 
        SET document = ?,
            name = ?,
            last_name = ?,
            email = ?,
            password = ?,
            phone_number = ?
        WHERE document = ?
    `;
    
    conexion.query(sql, [document, name, last_name, email, password, phone_number], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }
        
        res.json({ 
            message: 'Persona actualizada correctamente',
            document,
            name,
            last_name,
            email,
            password,
            phone_number
        });
    });
});

// eliminar una persona
app.delete('/person/delete/:document', async (req, res) => {
    const document = req.params.document;

    // Primero verificamos si la persona existe
    conexion.query('SELECT document FROM person WHERE document = ?', [document], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (results.length === 0) {
            return res.status(404).json({ 
                message: 'Persona no encontrada' 
            });
        }

        // Si la persona existe, procedemos a eliminarla
        const sql = 'DELETE FROM person WHERE document = ?';
        
        conexion.query(sql, [document], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            
            res.json({ 
                message: 'Persona eliminada correctamente',
                document
            });
        });
    });
});

// Rutas de la API para pet

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
    const { age, name, photo, species, weight, pet_owner_document } = req.body;
    const sql = 'INSERT INTO pet (age, name, photo, species, weight, pet_owner_document) VALUES (?, ?, ?, ?, ?, ?)';    // el id se genera automaticamente
    conexion.query(sql, [age, name, photo, species, weight, pet_owner_document], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id: result.insertId, age, name, photo, species, weight, pet_owner_document });
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
    const { age, name, photo, species, weight, pet_owner_document } = req.body;
    const sql = 'UPDATE person SET age = ?, name = ?, photo = ?, species = ?, weight = ?, pet_owner_document = ? WHERE id = ?';

    conexion.query(sql, [age, name, photo, species, weight, pet_owner_document, id], (err,
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
