const connection = require('../../db');

async function getVetSchedule(req, res) {
    const { veterinarian_document } = req.params;
    const sql = 'SELECT * FROM schedule WHERE veterinarian_document = ?';
    connection.query(sql, [veterinarian_document] , (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error getting veterinarian schedules');
        } else {
            return res.json(results);
        }
    });
}

async function postSchedule(req, res) {
    const { start_day, end_day, start_hour, end_hour } = req.body;

    const sql = `
        INSERT INTO schedule (start_day, end_day, start_hour, end_hour) VALUES (?, ?, ?, ?)
    `;

    connection.query(sql, [start_day, end_day, start_hour, end_hour], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error inserting Schedule' });
        }

        console.log('User inserted successfully');
        return res.status(201).json({ message: 'Schedule created successfully' });
    });
}


module.exports = {
    getVetSchedule,
    postSchedule
}
