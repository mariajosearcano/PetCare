const connection = require('../../db');

function postTreatment(req, res) {
    const { dose, medical_history_id, medicine_id } = req.body;
    const sql = 'INSERT INTO pet (dose, medical_history_id, medicine_id) VALUES (?, ?, ?)';    // el id se genera automaticamente
    connection.query(sql, [dose, medical_history_id, medicine_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ treatment_id: result.treatment_id, dose, medical_history_id, medicine_id });
    });
}

module.exports ={
    postTreatment
}