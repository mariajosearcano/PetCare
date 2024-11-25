const connection = require('../../db');

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

async function getScheduleByDay(req, res) {
    const { specialty, day } = req.params;
    const sql = `SELECT start_hour, end_hour FROM available INNER JOIN veterinarian ON available.veterinarian_document = veterinarian.document WHERE status = 'available' AND veterinarian.specialty = ? AND day = ? GROUP BY start_hour, end_hour ORDER BY day;`;
    connection.query(sql, [specialty, day], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error getting veterinarian schedules');
        } else {
            return res.json(results);
        }
    });
}

module.exports = {
    getDayBySpecialty,
    getScheduleByDay
}
