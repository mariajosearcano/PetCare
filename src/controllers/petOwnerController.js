const connection = require('../../db');

async function getPetOwners(req, res) {
    connection.query('SELECT * FROM pet_owner', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener los datos');
        } else {
            res.json(results);
        }
    });
}

async function putPetOwner(req, res) {

    const { 
        document,
        putDocument, putName, putLastName, putEmail, putPassword, putPhoneNumber
    } = req.body;

    const sql = `
        UPDATE pet_owner SET document = ?, name = ?, last_name = ?, email = ?, password = ?, phone_number = ? WHERE document = ?
    `;

    connection.query(sql, [putDocument, putName, putLastName, putEmail, putPassword, putPhoneNumber, document], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.redirect('/manageUsers');
    });
}

module.exports = {
    getPetOwners,
    putPetOwner
}