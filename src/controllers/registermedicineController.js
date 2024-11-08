const connection = require('../../db');

function medicine(req, res) {
    const { name, stock } = req.body;
    

    // Validación de datos de entrada (opcional, pero recomendado)
    if (!name || !stock) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const query = 'INSERT INTO medicine (name, stock) VALUES (?, ?)';
    const values = [name, stock];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al insertar la medicina' });
        } else {
            res.json({ message: 'Medicina registrada exitosamente', id: result.insertId });
            // Redireccionar después de la inserción exitosa (si es necesario)
            // res.redirect('/medicine_success_page');
        }
    });
}

module.exports = {
    medicine
};