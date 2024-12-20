const crypto = require ('crypto');
const connection = require("../../db");



async function encryptPassword(password) {
    try {
        return crypto.createHash('md5').update(password).digest('hex');
    } catch (err) {
        console.error('Error encrypting password: ', err);
        return null;
    }
}

function putPassword(req, res) {
    const { email, password } = req.body;

    const sql = `
        UPDATE pet_owner 
        SET password = ? 
        WHERE email = ?;
    
        UPDATE veterinarian 
        SET password = ? 
        WHERE email = ?;
    
        UPDATE clinic_administrator 
        SET password = ? 
        WHERE email = ?;
    `;

    encryptPassword(password)
        .then(encryptedPassword => {
             if (!encryptedPassword) {
                return res.status(500).send('Error encrypting password');
            }

            connection.query(sql, [encryptedPassword, email, encryptedPassword, email, encryptedPassword, email], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({error: 'Error changing password'});
                }

                if (result.affectedRows === 0) {
                    return res.status(400).json({error: 'There was an error trying to change the password'});
                }

                return res.json({message: 'Password changed successfully'});
            });
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).send('Error changing password');
        });
}



module.exports = {
    encryptPassword,
    putPassword
}