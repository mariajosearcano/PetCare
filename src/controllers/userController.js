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

async function deleteUser(req, res) {
    const { document, rol } = req.body;
    const table = await chooseTable(rol);

    const sql = `
        DELETE FROM ${table} WHERE document = ?
    `;

    connection.query(sql, [document], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.redirect('/manageUsers');
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
    postUser,
    deleteUser
}   

function login(req, res) {
    const { email, password } = req.body;
    console.log(email + password)

    const query = `
        INSERT INTO new_table
        SELECT *
        FROM source_table
        WHERE document = ?;
    `;

    query = `
        DELETE FROM pedidos_temporales
        WHERE estado = 'pendiente';
    `;

    connection.query(query, [email, password, email, password, email, password], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al iniciar sesión');
        } else if (results.length > 0) {
            const user = results[0];
            console.log('Usuario encontrado:', user);

            // Use the source_table column to determine the user's role
            const tableName = user.source_table;

            if (tableName === 'pet_owner') {
                console.log("dueñomascota");
                res.redirect('/petOwner');
            } else if (tableName === 'veterinarian') {
                console.log("veterinario");
                res.redirect('/veterinarian');
            } else if (tableName === 'clinic_administrator') {
                console.log("admin");
                res.redirect('/admin');
            } else {
                console.error('Usuario encontrado en una tabla desconocida');
                res.status(400).send('Error de autenticación');
            }
        } else {
            // Credenciales inválidas
            res.status(401).send('Credenciales inválidas');
        }
    });
}