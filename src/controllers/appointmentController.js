const connection = require('../../db');

function postAppointment(req, res) {
    const { day, start_hour, end_hour, pet_id, available_id } = req.body;
    const sql = 'INSERT INTO appointment (day, start_hour, end_hour, pet_id, available_id) VALUES (?, ?, ?, ?, ?)';    // el id se genera automaticamente
    connection.query(sql, [day, start_hour, end_hour, pet_id, available_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ appointment_id: result.appointment_id, day, start_hour, end_hour, pet_id });
    });
}

module.exports ={
    postAppointment
}