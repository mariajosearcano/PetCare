const { get } = require('jquery');
const connection = require('../../db');

function postAppointment(req, res) {
    const { day, start_hour, end_hour, pet_id, available_id } = req.body;
    const sql = 'INSERT INTO appointment (day, start_hour, end_hour, pet_id, available_id) VALUES (?, ?, ?, ?, ?)';    // el id se genera automaticamente
    connection.query(sql, [day, start_hour, end_hour, pet_id, available_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ appointment_id: result.appointment_id, day, start_hour, end_hour, pet_id });
    });
}

async function getAppointmentsByPetOwner(req, res) {
    const pet_owner_document = req.cookies.document;
    
    if (!pet_owner_document) {
        return res.status(400).json({ error: 'Pet Owner document not found in cookies' });
    }

    // Consulta con JOIN para obtener las citas relacionadas con las mascotas del dueño
    const sql = `
        SELECT 
            appointment.*,
            pet.name AS name
        FROM 
            appointment 
        INNER JOIN 
            pet ON appointment.pet_id = pet.pet_id 
        WHERE 
            pet.pet_owner_document = ?
    `;

    connection.query(sql, [pet_owner_document], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error getting Appointments' });
        }
        return res.json(results);
    });
}

async function getAppointmentsByVeterinarian(req, res) {
    const veterinarian_document = req.cookies.document;
    
    if (!veterinarian_document) {
        return res.status(400).json({ error: 'Veterinarian document not found in cookies' });
    }

    const sql = `
        SELECT 
            appointment.*,
            pet.pet_id AS pet_id,
            pet.name AS name
        FROM 
            appointment 
        INNER JOIN 
            pet ON appointment.pet_id = pet.pet_id
        INNER JOIN 
            available ON appointment.available_id = available.available_id
        WHERE 
            available.veterinarian_document = ?
    `;

    connection.query(sql, [veterinarian_document], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error getting Appointments' });
        }

        return res.json(results);
    });
}

async function deleteAppointment(req, res) {
    const { appointment_id } = req.body;

    const sql = `
        DELETE FROM appointment WHERE appointment_id = ?
    `;

    connection.query(sql, [appointment_id], (err, result) => {
        if (err) {
            if (err.sqlState === '45000') {
                // Error lanzado por el trigger
                return res.status(400).json({ error: err.message });
            } else {
                console.error(err);
                return res.status(500).json({ error: 'Appointment not deleted' });
            }
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        return res.json({ message: 'Appointment cancel successfully' });
    });
}

module.exports = {
    postAppointment,
    getAppointmentsByPetOwner,
    getAppointmentsByVeterinarian,
    deleteAppointment
}