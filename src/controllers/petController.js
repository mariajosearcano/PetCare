const connection = require('../../db');

// funciones

// Crear mascota 
function createPets(req, res) {
    const { age, name, species, weight, pet_owner_document } = req.body;
    const sql = 'INSERT INTO pet (age, name, species, weight, pet_owner_document) VALUES (?, ?, ?, ?, ?)';    // el id se genera automaticamente
    connection.query(sql, [age, name, species, weight, pet_owner_document], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id: result.insertId, age, name, species, weight, pet_owner_document });
    });
}

// get all pets
function getPets(req, res) {
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
function deletePets(req, res) {
    const { name } = req.params;
    const sql = 'DELETE FROM pet WHERE name = ?';
    connection.query(sql, [name], (err, result) => {
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