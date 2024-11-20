const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const conexion = require('./db');  // modulo local db
const router = require('./router');  // modulo local routes
const path = require('path');
const helmet = require('helmet');
// Inicializar la app de Express 
const app = express();

// Middleware 
app.use(cors(({ origin: '*' })));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; " +
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://code.jquery.com https://cdnjs.cloudflare.com; " +
        "font-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; " +
        "img-src 'self' data: https:;"
    );
    next();
});

//rutas
app.use('/', router);
app.use(express.static('src'));
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/src/css', express.static(path.resolve(__dirname, 'src/css')));
app.use('/src/html', express.static(path.resolve(__dirname, 'src/html')));

// Iniciar el servidor
app.listen(3007, () => {
    console.log('Server listening on http://localhost:3007');
});

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/src/html/base.html');
// });
  
// Ruta para la página principal (login.html)
// app.get('/login', (req, res) => {
//     res.sendFile(__dirname + '/src/html/login.html');
// });

//Ruta para manageUsers
// app.get('/manageUsers', (req, res) => {
//     res.sendFile(__dirname + '/src/html/manageUsers.html');
// })

// Ruta para admin.html
// app.get('/admin', (req, res) => {
//     res.sendFile(__dirname + '/src/html/admin.html');
// });

// // Ruta para formsPetOwner.html
// app.get('/form', (req, res) => {
//     res.sendFile(__dirname + '/src/html/formsPetOwner.html');
// });

// // Ruta para managePet.html
// app.get('/manage-pet', (req, res) => {
//     res.sendFile(__dirname + '/src/html/managePet.html');
// });

// app.get('/password', (req, res) => {
//     res.sendFile(__dirname + '/src/html/password.html');
// });

// rutas API para usuarios

// obtener todas las personas
// app.get('/person/read', (req, res) => {
//     conexion.query('SELECT * FROM person', (err, results) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.json(results);
//     });
// });

//crear una persona
// app.post('/petowner/create', (req, res) => {
//     const { document,name,last_name,email,password,phone_number } = req.body;
//     const sql = 'INSERT INTO pet_owner (document,name,last_name,email,password,phone_number) VALUES (?, ?, ?, ?, ?, ?)';
//     conexion.query(sql, [document,name,last_name,email,password,phone_number], (err, result) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.json({ id: result.insertId, document,name,last_name,email,password,phone_number });
//     });
// });

// // obtener una persona
// app.get('/person/read/:document', (req, res) => {
//     const document = req.params.document;
//     const sql = 'SELECT * FROM person WHERE document = ?';
    
//     conexion.query(sql, [document], (err, results) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
        
//         if (results.length === 0) {
//             return res.status(404).json({ message: 'Persona no encontrada' });
//         }
        
//         res.json(results[0]);
//     });
// });

// // actualizar una persona
// app.put('/person/update/:document', (req, res) => {
//     const { document, name, last_name, email, password, phone_number } = req.body;
    
//     const sql = `
//         UPDATE person 
//         SET document = ?,
//             name = ?,
//             last_name = ?,
//             email = ?,
//             password = ?,
//             phone_number = ?
//         WHERE document = ?
//     `;
    
//     conexion.query(sql, [document, name, last_name, email, password, phone_number], (err, result) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
        
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: 'Persona no encontrada' });
//         }
        
//         res.json({ 
//             message: 'Persona actualizada correctamente',
//             document,
//             name,
//             last_name,
//             email,
//             password,
//             phone_number
//         });
//     });
// });

// // eliminar una persona
// app.delete('/person/delete/:document', async (req, res) => {
//     const document = req.params.document;

//     // Primero verificamos si la persona existe
//     conexion.query('SELECT document FROM person WHERE document = ?', [document], (err, results) => {
//         if (err) {
//             return res.status(500).send(err);
//         }

//         if (results.length === 0) {
//             return res.status(404).json({ 
//                 message: 'Persona no encontrada' 
//             });
//         }

//         // Si la persona existe, procedemos a eliminarla
//         const sql = 'DELETE FROM person WHERE document = ?';
        
//         conexion.query(sql, [document], (err, result) => {
//             if (err) {
//                 return res.status(500).send(err);
//             }
            
//             res.json({ 
//                 message: 'Persona eliminada correctamente',
//                 document
//             });
//         });
//     });
// });

// // Rutas de la API para pet

// // Actualizar mascota (majo)
// app.put('/pet/put', (req, res) => {
//     const { id } = req.params;
//     const { age, name, photo, species, weight, pet_owner_document } = req.body;
//     const sql = 'UPDATE person SET age = ?, name = ?, photo = ?, species = ?, weight = ?, pet_owner_document = ? WHERE id = ?';

//     conexion.query(sql, [age, name, photo, species, weight, pet_owner_document, id], (err,
//         result) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.json({ message: 'pet updated' });
//     });
// });

// //Ingresar dependiendo perfil
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const sql = `
//             SELECT 'pet_owner' AS table_name, * FROM "pet_owner" WHERE email = ? AND password = ?
//             UNION ALL
//             SELECT 'veterinarian' AS table_name, * FROM "veterinarian" WHERE email = ? AND password = ?
//             UNION ALL
//             SELECT 'clinic_administrator' AS table_name, * FROM "clinic_administrator" WHERE email = ? AND password = ?
//         `;

//         const result = await pool.query(sql, [email, password, email, password, email, password]);

//         if (result.length > 0) {
//             const userProfile = result[0].table_name;

//             // Redirige según el perfil
//             switch (userProfile) {
//                 case 'pet_owner':
//                     return res.sendFile(__dirname + '/src/html/petOwner.html');
//                 case 'veterinarian':
//                     return res.sendFile(__dirname + '/src/html/manageUsers.html');
//                 case 'clinic_administrator':
//                     return res.sendFile(__dirname + '/src/html/admin.html');
//                 default:
//                     console.error('Perfil de usuario inesperado:', userProfile);
//                     return res.redirect('/login?error=true');
//             }
//         } else {
//             // Usuario no encontrado
//             res.redirect('/login?error=true');
//         }
//     } catch (err) {
//         console.error('Error en la solicitud de inicio de sesión:', err);
//         res.status(500).send('Error al procesar la solicitud');
//     }
// });
