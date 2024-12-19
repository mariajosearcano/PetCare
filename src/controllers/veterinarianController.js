const connection = require('../../db');
const {encryptPassword} = require("./passwordController");



async function postVeterinarian(req, res) {
    let { document, name, last_name, email, password, phone_number, specialty } = req.body;

    const sql = `
        INSERT INTO veterinarian (document, name, last_name, email, password, phone_number, specialty) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

     encryptPassword(password)
        .then(encryptedPassword => {
            if (!encryptedPassword) {
                return res.status(500).send('Error encrypting password');
            }

            connection.query(sql, [document, name, last_name, email, encryptedPassword, phone_number, specialty], (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        console.error('Duplicate entry:', err.message);

                        if (err.message.includes('document')) {
                            return res.status(409).json({error: 'The document already exists'});
                        } else if (err.message.includes('email')) {
                            return res.status(409).json({error: 'The email already exists'});
                        }

                        return res.status(409).json({error: 'Duplicate entry detected'});
                    }

                    console.error(err);
                    return res.status(500).json({error: 'Error inserting Veterinarian'});
                }

                console.log('Veterinarian inserted successfully');
                return res.status(201).json({message: 'Vaterinarian inserted successfully'});
            });
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).send('Error creating Veterinarian');
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
    const { specialty, day, start_hour } = req.params;
    const sql = `SELECT name, last_name, available_id FROM veterinarian INNER JOIN available ON available.veterinarian_document = veterinarian.document WHERE status = 'available' AND specialty = ? AND day = ? AND start_hour = ?`;
    connection.query(sql, [specialty, day, start_hour], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error getting veterinary users');
        } else {
            return res.json(results);
        }
    });
}

async function putVeterinarian(req, res) {
    let { document, name, last_name, email, password, phone_number, specialty, oldDocument } = req.body;

    const sql = `
        UPDATE veterinarian SET document = ?, name = ?, last_name = ?, email = ?, password = ?, phone_number = ?, specialty = ? WHERE document = ?
    `;

     encryptPassword(password)
        .then(encryptedPassword => {
            if (!encryptedPassword) {
                return res.status(500).send('Error encrypting password');
            }

            connection.query(sql, [document, name, last_name, email, encryptedPassword, phone_number, specialty, oldDocument], (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        console.error('Duplicate entry:', err.message);

                        if (err.message.includes('document')) {
                            return res.status(409).json({error: 'The document already exists'});
                        } else if (err.message.includes('email')) {
                            return res.status(409).json({error: 'The email already exists'});
                        }

                        return res.status(409).json({error: 'Duplicate entry detected'});
                    }

                    console.error(err);
                    return res.status(500).json({error: 'Veterinarian not updated'});
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json({error: 'Veterinarian not found'});
                }

                return res.json({message: 'Veterinarian updated successfully'});
            });
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).send('Error updating Veterinarian');
        });
}

async function deleteVeterinarian(req, res) {
    let { document } = req.body;

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