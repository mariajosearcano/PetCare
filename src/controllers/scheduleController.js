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
            if (err.code === 'ER_DUP_ENTRY') {
                console.error('Duplicate entry:', err.message);
                
                if (err.message.includes('start_day')) {
                    return res.status(409).json({ error: 'There is already a schedule for that date' });
                }

                return res.status(409).json({ error: 'Duplicate entry detected' });
            }

            console.error(err);
            return res.status(500).json({ error: 'Error inserting Schedule' });
        }

        console.log('User inserted successfully');
        return res.status(201).json({ message: 'Schedule created successfully' });
    });
}

async function getSchedules(req, res) {
    connection.query('SELECT * FROM schedule', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error getting Schedules' });
        } else {
            return res.json(results);
        }
    });
}

async function putSchedule(req, res) {
    const { oldPutForm, putFormData } = req.body;
    const { putScheduleId } = oldPutForm;
    const { start_day, end_day, start_hour, end_hour } = putFormData;

    const sql = `
        UPDATE schedule SET start_day = ?, end_day = ?, start_hour = ?, end_hour = ? WHERE schedule_id = ?
    `;

    connection.query(sql, [start_day, end_day, start_hour, end_hour, putScheduleId], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                console.error('Duplicate entry:', err.message);

                if (err.message.includes('start_day')) {
                    return res.status(409).json({ error: 'There is already a schedule for that date' });
                }

                return res.status(409).json({ error: 'Duplicate entry detected' });
            }

            console.error(err);
            return res.status(500).json({ error: 'Schedule not updated' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Schedule not found' });
        }

        return res.json({ message: 'Schedule updated successfully' });
    });
}

async function deleteSchedule(req, res) {
    const { schedule_id } = req.body;

    const sql = `
        DELETE FROM schedule WHERE schedule_id = ?
    `;

    connection.query(sql, [schedule_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Schedule not deleted' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Schedule not found' });
        }

        return res.json({ message: 'Schedule deleted successfully' });
    });
}


module.exports = {
    getVetSchedule,
    postSchedule,
    getSchedules,
    putSchedule,
    deleteSchedule
}
