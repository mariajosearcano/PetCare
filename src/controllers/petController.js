const connection = require('../../db');

// Crear mascota 
async function createPets(req, res) {
    const { age, name, photo, species, weight, pet_owner_document } = req.body;
    const sql = 'INSERT INTO pet (age, name, photo, species, weight, pet_owner_document) VALUES (?, ?, ?, ?, ?, ?)';    // el id se genera automaticamente
    conexion.query(sql, [age, name, photo, species, weight, pet_owner_document], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id: result.insertId, age, name, photo, species, weight, pet_owner_document });
    });
}

// get all pets
async function getPets(req, res) {
    connection.query('SELECT * FROM pet', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('there was an error getting the data'); 
        } else {
            console.log(results)
            res.json(results);
        }
    });
}

// delete pet
async function deletePets(req, res) {
    const { id } = req.params;
    const sql = 'DELETE FROM pet WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'pet deleted' });
    });
}

module.exports ={
    createPets,
    getPets,
    deletePets
}