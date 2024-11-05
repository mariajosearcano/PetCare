const connection = require('../../db');

async function postUser(req, res) {
    const { document, name, last_name, email, password, phone_number, rol } = req.body;
    const table = await chooseTable(rol);

    const sql = `
        INSERT INTO ${table} (document, name, last_name, email, password, phone_number) VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.query(sql, [document, name, last_name, email, password, phone_number], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.redirect('/manageUsers');
    });
}

async function putUser(req, res) {
    const { document, name, last_name, email, password, phone_number, rol } = req.body;
    const table = await chooseTable(rol);

    const sql = `
        UPDATE ${table} SET name = ?, last_name = ?, email = ?, password = ?, phone_number = ? WHERE document = ?
    `;

    connection.query(sql, [name, last_name, email, password, phone_number, document], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.redirect('/manageUsers');
    });
}

async function chooseTable(rol) {
    if (rol == 'Pet Owner'){
        return ('pet_owner').toString();
    } else {
        return ('veterinarian').toString();
    }
}

module.exports = {
    postUser,
    putUser
}   