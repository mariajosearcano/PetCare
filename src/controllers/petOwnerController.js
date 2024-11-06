const connection = require('../../db');

function getPetOwners(req, res) {
    connection.query('SELECT * FROM pet_owner', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener los datos');
        } else {
            console.log(results) ////usa esto para depurrar mas el codigo, generalmente las funciones err no se nstancian asi, no se trabaja en ese else,
            res.json(results);
        }
    });
}

module.exports = {
    getPetOwners
}