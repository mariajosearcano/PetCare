const connection = require('../../db');

async function postVeterinarian(req, res) {
    const { document, name, last_name, email, password, phone_number, specialty } = req.body;

    const sql = `
        INSERT INTO veterinarian (document, name, last_name, email, password, phone_number, specialty) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(sql, [document, name, last_name, email, password, phone_number, specialty], (err, result) => {
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
            //console.log('Veterinarians users successfully obtained');
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

async function getVeterinarianBySpecialty(req, res) {
    const { specialty } = req.params;
    const sql = 'SELECT * FROM veterinarian WHERE specialty = ?';
    connection.query(sql, [specialty], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error getting veterinary users');
        } else {
            // console.log('Veterinary users successfully obtained');
            return res.json(results);
        }
    });
}

// // obtener una persona
// app.get('/person/read/:document', (req, res) => {
//     const document = req.params.document;
//     const sql = 'SELECT * FROM person WHERE document = ?';

//     conexion.query(sql, [document], (err, results) => {
//         if (err) {
//             return res.status(500).send(err);
//         }

//         if (results.length === 0) {
//             return res.status(404).json({ message: 'Persona no encontrada' });
//         }

//         res.json(results[0]);
//     });
// });

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
    getVeterinarianBySpecialty,
    putVeterinarian,
    deleteVeterinarian
}