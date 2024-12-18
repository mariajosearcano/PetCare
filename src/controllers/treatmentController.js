const connection = require('../../db');



function postTreatment(req, res) {
    const { dose, medical_history_id, medicine_id, medicine_type } = req.body;
    const sql = 'INSERT INTO treatment (dose, medical_history_id, medicine_id, medicine_type) VALUES (?, ?, ?, ?)';    // el id se genera automaticamente
    connection.query(sql, [dose, medical_history_id, medicine_id, medicine_type], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ treatment_id: result.treatment_id, dose, medical_history_id, medicine_id, medicine_type });
    });
}

function getTreatment(req, res) {
    const sql = 'SELECT * FROM treatment';
    connection.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send
        }
        res.json(result);
    });
}

  function getPetsId(req, res) {
    const sql = `
      SELECT mh.pet_id, p.name, mh.medical_history_id
      FROM medical_history mh
      INNER JOIN pet p ON mh.pet_id = p.pet_id
    `;
    console.log('Ejecutando consulta:', sql);
    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      console.log('Resultado de la consulta:', result);
      res.json(result);
    });
  }

  function getTreatmentForPet(req, res) {
    const medical_history_id = req.params.medical_history_id;
  
    // Log del parámetro recibido
    console.log('ID del historial médico recibido:', medical_history_id);
  
    // Consulta SQL para obtener los datos adicionales (ejemplo: historial médico)
    const sql = 'SELECT * FROM medical_history WHERE medical_history_id = ?';
    connection.query(sql, [medical_history_id], (err, result) => {
      if (err) {
        console.error('Error en la consulta SQL:', err);
        return res.status(500).send(err);
      }
  
      // Log del resultado de la consulta SQL
      console.log('Resultado de la consulta SQL:', result);
  
      // Respuesta JSON al cliente
      res.json(result);
    });
  }
  


  
  

module.exports ={
    postTreatment,
    getPetsId,
    getTreatment,
    getTreatmentForPet
}