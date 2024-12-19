const connection = require("../../db");
const {encryptPassword} = require("./passwordController");



function getAdministrator(req, res) {
    const administrator_document = req.cookies.document;

    if (!administrator_document) {
        return res.status(400).json({ error: 'Missing Administrator document cookie' });
    }

    const sql = `
        SELECT * FROM clinic_administrator WHERE document = ?
    `;

    connection.query(sql, [administrator_document], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error getting Administrator' });
        }

        return res.json(result[0]);
    });
}

function putPasswordAdministrator(req, res) {
    const { document, password } = req.body;

    const sql = `
        UPDATE clinic_administrator
        SET password = ?
        WHERE document = ?
    `;

    encryptPassword(password)
        .then(encryptedPassword => {
             if (!encryptedPassword) {
                return res.status(500).send('Error encrypting password');
            }

            connection.query(sql, [encryptedPassword, document], (err, result) => {
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
    getAdministrator,
    putPasswordAdministrator
}