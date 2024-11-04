const {Router} = require('express');
const router = Router();
const connection = require('../../db');

function postUser(req, res) {
    connection.query('SELECT * FROM pet_owner', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener los datos');
        } else {
            res.json(results);
        }
    });
}

module.exports = {
   
}