const connection = require('../../db');

async function getMedicalRecord(req, res) {
    const sql = `
SELECT 
	treatment_id,
    pet.name AS pet,
    medical_history.medical_history_id,
    diagnosis,
    medicine.name AS medice,
    medicine_type,
    dose
FROM
    treatment
        JOIN
    medical_history ON treatment.medical_history_id = medical_history.medical_history_id
		JOIN
	pet ON medical_history.pet_id = pet.pet_id
		JOIN
	medicine ON treatment.medicine_id = medicine.medicine_id`;
    connection.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error getting medical record');
        } else {
            return res.json(results);
        }
    });
}

module.exports = {
    getMedicalRecord
}