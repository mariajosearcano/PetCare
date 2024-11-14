const connection = require('../../db');

function getMedicalHistories(req, res) {
    const sql = 'SELECT * FROM medical_history';
    connection.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send
        }
        res.json(result);
    });
}

module.exports ={
    getMedicalHistories
}