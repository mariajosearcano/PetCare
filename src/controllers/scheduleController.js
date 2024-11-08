const connection = require('../../db');

async function getVetSchedule(req, res) {
    connection.query('SELECT * FROM schedule WHERE veterinarian_document = ?', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error getting veterinarian schedules');
        } else {
            return res.json(results);
        }
    });
}

module.exports = {
    getVetSchedule
}
