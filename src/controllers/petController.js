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



function getPetsAndPetOwners(req, res) {
    const sql = `
        SELECT 
            pet.pet_id AS pet_id,
            pet.name AS name,
            pet.species AS species,
            pet.age AS age,
            pet.weight AS weight,
            pet.pet_owner_document AS pet_owner_document,
            pet_owner.name AS pet_owner_name
        FROM 
            pet
        JOIN 
            pet_owner ON pet.pet_owner_document = pet_owner.document;
    `;

    connection.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('there was an error getting the data'); 
        } else {
            res.json(result);
        }
    });
}

async function putPet(req, res) {

    const { oldPutForm, putFormData } = req.body;
    const { putPetId, pet_owner_document } = oldPutForm;
    const { name, species, age, weight, photo } = putFormData;

    const sql = `
        UPDATE pet SET name = ?, species = ?, age = ?, weight = ?, photo = ? WHERE pet_id = ?
    `;

    connection.query(sql, [name, species, age, weight, photo, putPetId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Pet not updated');
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        return res.json({ message: 'Pet updated successfully' });
    });
}



module.exports ={
    createPets,
    getPets,
    deletePets,
    getPetsAndPetOwners,
    putPet
}