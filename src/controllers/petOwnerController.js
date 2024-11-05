const connection = require('../../db');

async function getPetOwners(req, res) {
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
    getPetOwners
}