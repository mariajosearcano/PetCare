const connection = require('../../db');

async function postVeterinarian(req, res) {
    const { document, name, last_name, email, password, phone_number } = req.body;

    const sql = `
        INSERT INTO veterinarian (document, name, last_name, email, password, phone_number) VALUES (?, ?, ?, ?, ?, ?)
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
            return res.status(500).send('Error inserting Veterinarian user');
        }

        console.log('User inserted successfully');
        return res.status(201).send('Vaterinarian user inserted successfully');
    });
}

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

    const { oldPutForm, putFormData } = req.body;
    const { putDocument } = oldPutForm;
    const { document, name, last_name, email, password, phone_number } = putFormData;

    const sql = `
        UPDATE veterinarian SET document = ?, name = ?, last_name = ?, email = ?, password = ?, phone_number = ? WHERE document = ?
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
            return res.status(500).send('Veterinarian user not updated');
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Veterinarian user not found' });
        }

        return res.json({ message: 'Veterinarian user updated successfully' });
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
    postVeterinarian,
    getVeterinarians,
    putVeterinarian,
    deleteVeterinarian
}