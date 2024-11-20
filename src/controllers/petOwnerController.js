const connection = require('../../db');
const crypto = require ('crypto');

async function encryptPassword(password) {
    try {
      // Create a salt (a random string)
      const salt = crypto.randomBytes(16).toString('hex');
  
      // Create a hash of the password and salt
      
      const hash = crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha512').toString('hex');
  
      return hash;
    } catch (error) {
      console.error('Error encriptando contraseña:', error);
      return null;
    }
  }


async function postPetOwner(req, res) {
    const { document, name, last_name, email, phone_number } = req.body;
    let { password } = req.body;
    password = await encryptPassword(password);
    console.log(encryptPassword);

    const sql = `
        INSERT INTO pet_owner (document, name, last_name, email, password, phone_number) VALUES (?, ?, ?, ?, ?, ?)
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
            return res.status(500).json({ error: 'Error inserting Pet owner user' });
        }

        console.log('User inserted successfully');
        return res.status(201).json({ message: 'Pet owner user created successfully' });
    });
}

async function getPetOwners(req, res) {
    connection.query('SELECT * FROM pet_owner', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error getting pet owner users' });
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
                    return res.status(409).json({ error: 'The document already exists' });
                } else if (err.message.includes({ error: 'email' })) {
                    return res.status(409).json({ error: 'The email already exists' });
                }

                return res.status(409).json({ error: 'Duplicate entry detected' });
            }

            console.error(err);
            return res.status(500).json({ error: 'Pet owner user not updated' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pet owner user not found' });
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
            return res.status(500).json({ error: 'Pet owner user not deleted' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pet owner user not found' });
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