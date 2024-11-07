const connection = require('../../db');

async function postUser(req, res) {
    const { document, name, last_name, email, password, phone_number, rol } = req.body;
    const table = await chooseTable(rol);

    const sql = `
        INSERT INTO ${table} (document, name, last_name, email, password, phone_number) VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.query(sql, [document, name, last_name, email, password, phone_number], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error inserting user');
        }

        console.log('User inserted successfully');
        return res.status(201).send('User inserted successfully');
    });
}

function chooseTable(rol) {
    if (rol == 'Pet Owner'){
        return ('pet_owner').toString();
    } else {
        return ('veterinarian').toString();
    }
}

module.exports = {
    postUser
}   