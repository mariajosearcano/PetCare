const connection = require('../../db');

function getVeterinarians(req, res) {
    connection.query('SELECT * FROM veterinarian', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener los datos');
        } else {
            res.json(results);
        }
    });
}

module.exports = {
    getVeterinarians
}