const connection = require('../../db');

async function getMedicines(req, res) {
    connection.query('SELECT * FROM medicine', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error getting medicines');
        } else {
            return res.json(results);
        }
    });
}

module.exports ={
    getMedicines
}