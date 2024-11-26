const connection = require('../../db');



async function getAppointmentsByDocument(req, res) {
    const pet_owner_document = req.cookies.document;
    
    if (!pet_owner_document) {
        return res.status(400).json({ error: 'Pet Owner document not found in cookies' });
    }

    // Consulta con JOIN para obtener las citas relacionadas con las mascotas del dueño
    const query = `
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

    connection.query(query, [pet_owner_document], (err, results) => {
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
            console.error(err);
            return res.status(500).json({ error: 'Appointment not deleted' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        return res.json({ message: 'Appointment cancel successfully' });
    });
}



module.exports = {
    getAppointmentsByDocument,
    deleteAppointment
}