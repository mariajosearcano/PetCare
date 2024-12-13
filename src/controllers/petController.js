const connection = require('../../db');
const { uploadImage, deleteImage } = require('./photoController');
const multer = require('multer');
const path = require('path');



// MULTER CONFIG

// Configuración de multer para manejar la subida de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Directorio temporal para las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Validar tipos de archivo
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
}).single('photo'); // 'photo' debe coincidir con el nombre del campo en el formulario



// funciones

// Crear mascota 
function createPets(req, res) {
    const { age, name, species, weight, photo_url, pet_owner_document } = req.body;
    const sql = 'INSERT INTO pet (age, name, species, weight, photo_url, pet_owner_document) VALUES (?, ?, ?, ?, ?, ?)';    // el id se genera automaticamente
    connection.query(sql, [age, name, species, weight, photo_url, pet_owner_document], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id: result.insertId, age, name, species, weight, photo_url, pet_owner_document });
    });
}

// get all pets
function getPets(req, res) {
    connection.query('SELECT * FROM pet', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('there was an error getting the data'); 
        } else {
            res.json(results);
        }
    });
}

// get pet id
function getPetId(req, res) {
    const { name } = req.params;
    const sql = 'SELECT pet_id FROM pet WHERE name = ?';
    connection.query(sql, [name], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error getting pet id');
        } else {
            res.json(results[0]);
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
    const { age, name, species, weight, photo_url, pet_owner_document } = req.body;
    const sql = 'INSERT INTO pet (age, name, species, weight, photo_url, pet_owner_document) VALUES (?, ?, ?, ?, ?, ?)';    // el id se genera automaticamente
    connection.query(sql, [age, name, species, weight, photo_url, pet_owner_document], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id: result.insertId, age, name, species, weight, photo_url, pet_owner_document });
    });
}



function getPetsByPetOwner(req, res) {
    const pet_owner_document = req.cookies.document;

    const sql = `
        SELECT * FROM pet WHERE pet_owner_document = ?
    `;

    connection.query(sql, [pet_owner_document], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error getting Pets' }); 
        }

        return res.json(result);
    });
}

async function putPet(req, res) {
    const { putName, putSpecies, putAge, putWeight, photo_url, pet_id } = req.body;

    const sql = `
        UPDATE pet SET name = ?, species = ?, age = ?, weight = ?, photo_url = ? WHERE pet_id = ?
    `;

    connection.query(sql, [putName, putSpecies, putAge, putWeight, photo_url, pet_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Pet not updated' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        return res.json({ message: 'Pet updated successfully' });
    });
}

async function deletePet(req, res) {
    const { pet_id } = req.body;

    const sql = `
        DELETE FROM pet WHERE pet_id = ?
    `;

    connection.query(sql, [pet_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Pet not deleted' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        return res.json({ message: 'Pet deleted successfully' });
    });
}



module.exports ={
    createPets,
    getPets,
    deletePets,
    getPetsByPetOwner,
    putPet,
    deletePet,
    getPetId
}