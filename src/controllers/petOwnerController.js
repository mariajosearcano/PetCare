const connection = require('../../db');

async function getPetOwners(req, res) {
    connection.query('SELECT * FROM pet_owner', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error getting pet owner users');
        } else {
            return res.json(results);
        }
    });
}

async function putPetOwner(req, res) {

    const { oldPutForm, putFormData } = req.body;
    const { putDocument } = oldPutForm;
    const { document, name, last_name, email, password, phone_number } = putFormData;

    const sql = `
        UPDATE pet_owner SET document = ?, name = ?, last_name = ?, email = ?, password = ?, phone_number = ? WHERE document = ?
    `;

    connection.query(sql, [document, name, last_name, email, password, phone_number, putDocument], (err, result) => {
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