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
                    return res.status(409).json({ error: 'The document already exists' });
                } else if (err.message.includes('email')) {
                    return res.status(409).json({ error: 'The email already exists' });
                }

                return res.status(409).json({ error: 'Duplicate entry detected' });
            }

            console.error(err);
            return res.status(500).json({ error: 'Error inserting Veterinarian user' });
        }

        console.log('User inserted successfully');
        return res.status(201).json({ message: 'Vaterinarian user inserted successfully' });
    });
}

async function getVeterinarians(req, res) {
    connection.query('SELECT * FROM veterinarian', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error getting veterinary users' });
        } else {
            //console.log('Veterinary users successfully obtained');
            return res.json(results);
        }
    });
}

async function getOneVeterinarian(req, res) {
    const { name } = req.params;
    const sql = 'SELECT * FROM veterinarian WHERE name = ?';
    connection.query(sql, [name], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error getting veterinary users' });
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
                    return res.status(409).json({ error: 'The document already exists' });
                } else if (err.message.includes('email')) {
                    return res.status(409).json({ error: 'The email already exists' });
                }

                return res.status(409).json({ error: 'Duplicate entry detected' });
            }

            console.error(err);
            return res.status(500).json({ error: 'Veterinarian user not updated' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Veterinarian user not found' });
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
            return res.status(500).json({ error: 'Veterinarian user not deleted' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Veterinarian user not found' });
        }

        return res.json({ message: 'Veterinarian user deleted successfully' });
    });
}

module.exports = {
    postVeterinarian,
    getVeterinarians,
    getOneVeterinarian,
    putVeterinarian,
    deleteVeterinarian
}