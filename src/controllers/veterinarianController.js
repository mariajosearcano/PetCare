const connection = require('../../db');

async function getVeterinarians(req, res) {
    connection.query('SELECT * FROM veterinarian', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error getting veterinary users');
        } else {
            //console.log('Veterinary users successfully obtained');
            return res.json(results);
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
            console.error(err)
            return res.status(500).send('Veterinary user not updated');
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Veterinary user not found' });
        }

        return res.json({ message: 'Veterinary user updated successfully' });
    });
}

async function deleteVeterinarian(req, res) {
    const { document } = req.body;

    const sql = `
        DELETE FROM veterinarian WHERE document = ?
    `;

    connection.query(sql, [document], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Veterinarian user not deleted');
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Veterinarian user not found' });
        }

        return res.json({ message: 'Veterinarian user deleted successfully' });
    });
}

module.exports = {
    getVeterinarians,
    putVeterinarian,
    deleteVeterinarian
}