const connection = require('../../db');

async function postPetOwner(req, res) {
    const { document, name, last_name, email, password, phone_number } = req.body;

    const sql = `
        INSERT INTO pet_owner (document, name, last_name, email, password, phone_number) VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.query(sql, [document, name, last_name, email, password, phone_number], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                console.error('Duplicate entry:', err.message);
                
                if (err.message.includes('document')) {
                    return res.status(409).send('The document already exists');
                } else if (err.message.includes('email')) {
                    return res.status(409).send('The email already exists');
                } else if (err.message.includes('phone_number')) {
                    return res.status(409).send('The phone number already exists');
                }

                return res.status(409).send('Duplicate entry detected');
            }
            
            console.error(err);
            return res.status(500).send('Error inserting Pet owner user');
        }

        console.log('User inserted successfully');
        return res.status(201).send('Pet owner user inserted successfully');
    });
}

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
            if (err.code === 'ER_DUP_ENTRY') {
                console.error('Duplicate entry:', err.message);

                if (err.message.includes('document')) {
                    return res.status(409).send('The document already exists');
                } else if (err.message.includes('email')) {
                    return res.status(409).send('The email already exists');
                } else if (err.message.includes('phone_number')) {
                    return res.status(409).send('The phone number already exists');
                }

                return res.status(409).send('Duplicate entry detected');
            }

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
    postPetOwner,
    getPetOwners,
    putPetOwner,
    deletePetOwner
}