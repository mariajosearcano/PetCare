const connection = require('../../db');

async function getPetOwners(req, res) {
    connection.query('SELECT * FROM pet_owner', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error getting pet owner users');
        } else {
            //console.log('Pet owner users successfully obtained');
            return res.json(results);
        }
    });
}

async function putPetOwner(req, res) {

    const { putUserForm, newPutUserForm } = req.body;
    const { putDocument } = putUserForm;
    const { newPutDocument, newPutName, newPutLastName, newPutEmail, newPutPassword, newPutPhoneNumber } = newPutUserForm;

    const sql = `
        UPDATE pet_owner SET document = ?, name = ?, last_name = ?, email = ?, password = ?, phone_number = ? WHERE document = ?
    `;

    connection.query(sql, [newPutDocument, newPutName, newPutLastName, newPutEmail, newPutPassword, newPutPhoneNumber, putDocument], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Pet owner user not updated');
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pet owner user not found' });
        }

        return res.json({ message: 'Pet owner user updated successfully' });
    });
}

async function deletePetOwner(req, res) {
    const { document } = req.body;

    const sql = `
        DELETE FROM pet_owner WHERE document = ?
    `;

    connection.query(sql, [document], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Pet owner user not deleted');
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pet owner user not found' });
        }

        return res.json({ message: 'Pet owner user deleted successfully' });
    });
}

module.exports = {
    getPetOwners,
    putPetOwner,
    deletePetOwner
}