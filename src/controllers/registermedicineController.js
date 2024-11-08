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

async function getMedicines(req, res) {
  connection.query('SELECT * FROM medicine', (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Error getting medicines');
      } else {
          return res.json(results);
      }
  });
}

// async function deleteMedicineById(req, res) {
//   const medicineId = req.params.id; // Obtener el ID del medicamento de los parámetros de la solicitud

//   connection.query('DELETE FROM medicine WHERE id = ?', [medicineId], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Error deleting medicine');
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).send('Medicine not found');
//     }

//     return res.sendStatus(204); // No content, indicating successful deletion
//   });
// }

  async function deleteMedicineById(req, res) {
    const { medicine_id } = req.body;

    try {
      const sql = `
        DELETE FROM medicine WHERE medicine_id = ?
      `;

      await connection.query(sql, [medicine_id], (err, result) => {
        if (err) {
          throw err;
        }

        if (result.affectedRows === 0) {
          throw new Error('Medicine not found');
        }

        res.status(200).json({ message: 'Medicine deleted successfully' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting pet owner' });
    }
  }

// async function getMedicineById(req, res) {
//   const medicineId = req.params.id; 

//   connection.query('SELECT * FROM medicine WHERE id = ?', [medicineId], (err, results) => {
//       if (err) {
//           console.error(err);
//           return res.status(500).send('Error getting medicine');
//       } else if (results.length === 0) {
//           return res.status(404).send('Medicine not found');
//       } else {
//           return res.json(results[0]); // Devuelve solo el medicamento encontrado
//       }
//   });
// }


// async function getMedicineById(id, res) {
//   try {
//     // Ejecuta la consulta de forma asíncrona usando promesas
//     const [rows] = await connection.execute('SELECT * FROM medicine WHERE medicine_id = ?', [id]);

//     // Si se encuentra un resultado, lo enviamos en formato JSON
//     if (rows.length > 0) {
//       res.json(rows[0]);
//     } else {
//       res.status(404).json({ message: 'Medicament not found' });
//     }
//   } catch (error) {
//     console.error('Error get medicine:', error);
//     res.status(500).json({ error: 'Error bdd' });
//   }
// }

// async function getMedicineById(id, res) {
//     connection.query('SELECT * FROM medicine WHERE medicine_id = ?', [id], (err, results) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send('Error al buscar el medicamento');
//       } else {
//         res.json(results[0]);
//       }
//     });
//   }
  
  // function updateMedicine(medicineId, name, stock, connection, res) {
  //   connection.query('UPDATE medicine SET name = ?, stock = ? WHERE medicine_id = ?', [name, stock, medicineId], (err, result) => {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).send('Error al actualizar el medicamento');
  //     } else {
  //       res.send('Medicamento actualizado correctamente');
  //     }
  //   });
  // }

module.exports = {
    medicine,
    getMedicines,
    //getMedicineById,
    //updateMedicine
    deleteMedicineById

};

