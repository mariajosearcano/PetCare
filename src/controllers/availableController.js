const connection = require('../../db');

async function getAvailability(req, res) {
    const sql = "SELECT * FROM available WHERE status = 'available' ";
    connection.query(sql , (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error getting veterinarian schedules');
        } else {
            return res.json(results);
        }
    });
}

async function getDayBySpecialty(req, res) {
    const { specialty } = req.params;
    const sql = `SELECT day FROM available INNER JOIN veterinarian ON available.veterinarian_document = veterinarian.document WHERE status = 'available' AND veterinarian.specialty = ? GROUP BY day ORDER BY day`;
    connection.query(sql, [specialty], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error getting veterinarian schedules');
        } else {
            return res.json(results);
        }
    });
}

module.exports = {
    getAvailability,
    getDayBySpecialty
}
