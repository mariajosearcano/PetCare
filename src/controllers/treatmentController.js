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
  
    // Consulta SQL para obtener los datos adicionales (ejemplo: historial médico)
    const sql = 'SELECT * FROM medical_history WHERE medical_history_id = ?';
    connection.query(sql, [medical_history_id], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(result);
    });
  };

  // app.get('/generatePDF/:id', async (req, res) => {
  //   const { id } = req.params;
  
  //   try {
  //     // Consulta a la base de datos para obtener los datos del ID
  //     const [rows] = await pool.query('SELECT * FROM tu_tabla WHERE id = ?', [id]);
  
  //     if (rows.length === 0) {
  //       return res.status(404).send('No se encontró información para el ID especificado');
  //     }
  
  //     const data = rows[0]; // Suponiendo que solo hay un resultado
  
  //     // Crear el documento PDF
  //     const doc = new pdfkit();
  //     doc.text(`Datos para el ID ${id}`);
  //     // Agregar el resto de los datos al PDF (personaliza según tu estructura)
  //     doc.text(`Campo 1: ${data.campo1}`);
  //     doc.text(`Campo 2: ${data.campo2}`);
  
  //     // Enviar el PDF como respuesta
  //     doc.pipe(res);
  //     doc.end();
  //   } catch (error) {
  //     console.error('Error al generar el PDF:', error);
  //     res.status(500).send('Error interno del servidor');   
  
  //   }
  // });

  
  

module.exports ={
    postTreatment,
    getPetsId,
    getTreatment,
    getTreatmentForPet
}