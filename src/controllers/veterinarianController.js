const connection = require('../../db');

async function getVeterinarians(req, res) {
    connection.query('SELECT * FROM veterinarian', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener los datos');
        } else {
            res.json(results);
        }
    });
}

async function putVeterinarian(req, res) {

    const { putUserForm, newPutUserForm } = req.body;
    const { putDocument } = putUserForm;
    const { newPutDocument, newPutName, newPutLastName, newPutEmail, newPutPassword, newPutPhoneNumber } = newPutUserForm;

    const sql = `
        UPDATE veterinarian SET document = ?, name = ?, last_name = ?, email = ?, password = ?, phone_number = ? WHERE document = ?
    `;

    connection.query(sql, [newPutDocument, newPutName, newPutLastName, newPutEmail, newPutPassword, newPutPhoneNumber, putDocument], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.redirect('/manageUsers');
    });
}

module.exports = {
    getVeterinarians,
    putVeterinarian
}