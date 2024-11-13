const connection = require('../../db');

function postTreatment(req, res) {
    const { dose, medical_history_id, medicine_id } = req.body;
    const sql = 'INSERT INTO treatment (dose, medical_history_id, medicine_id) VALUES (?, ?, ?)';    // el id se genera automaticamente
    connection.query(sql, [dose, medical_history_id, medicine_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ treatment_id: result.treatment_id, dose, medical_history_id, medicine_id });
    });
}

function getTreatment(req, res) {
    const sql = 'SELECT * FROM treatment';
    connection.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send
        }
        res.json(result);
    });
}

module.exports ={
    postTreatment,
    getTreatment
}