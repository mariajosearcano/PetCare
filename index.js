const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

// Inicializa la aplicación Express
const app = express();

// Middleware para procesar los datos enviados por el formulario (POST)
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta assets
app.use('/assets', express.static('assets'));
app.use('/src/css', express.static(__dirname + '/src/css'));


// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',        
  host: 'localhost',         // Host donde corre PostgreSQL
  database: 'bbd_owner',     // Cambia por el nombre de tu base de datos
  password: 'madiar2003',    // Cambia por tu contraseña de PostgreSQL
  port: 5432,                // Puerto por defecto de PostgreSQL
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Consultar la tabla 'pet_owner'
    let result = await pool.query(
      'SELECT * FROM "pet_owner" WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      return res.sendFile(__dirname + '/src/html/petOwner.html');
    }

    // Consultar la tabla 'veterinarians' si no está en 'pet_owner'
    result = await pool.query(
      'SELECT * FROM "veterinarians" WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      return res.sendFile(__dirname + '/src/html/manageUsers.html');
    }

    // Consultar la tabla 'clinic_administrator' si no está en 'veterinarians'
    result = await pool.query(
      'SELECT * FROM "clinic_administrator" WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      return res.sendFile(__dirname + '/src/html/admin.html');
    }

    // Si no se encuentra en ninguna tabla, redirigir con un mensaje de error
    return res.redirect('/login?error=1'); 
  } catch (err) {
    console.error(err);
    res.send('Error al procesar la solicitud');
  }
});


// Ruta para la página principal (base.html)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/html/base.html');
});

// Ruta para la página principal (login.html)
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/src/html/login.html');
});

// Ruta para admin.html
app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/src/html/admin.html');
});

// Ruta para formsPetOwner.html
app.get('/form', (req, res) => {
  res.sendFile(__dirname + '/src/html/formsPetOwner.html');
});



// Ruta para managePet.html
app.get('/manage-pet', (req, res) => {
  res.sendFile(__dirname + '/src/html/managePet.html');
});

app.get('/password', (req, res) => {
  res.sendFile(__dirname + '/src/html/password.html');
});

// Ruta para manejar el envío del formulario
app.post('/submit-form', async (req, res) => {
  const { name, lastName, document, email, address, phone, password } = req.body;

  try {
    // Inserta los datos en la tabla 'pet-owner'
    await pool.query(
      'INSERT INTO "pet_owner" (name, last_name, id, email, address, phone_number, password) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [name, lastName, document, email, address, phone, password]
    );
    res.redirect('/confirmation?message=Data%20inserted%20successfully'); // Redirigir a la página de confirmación con el mensaje
  } catch (err) {
    console.error(err);
    res.redirect('/confirmation?message=Error%20inserting%20data'); // Redirigir a la página de confirmación con el mensaje de error
  }
});

// Ruta para la página de confirmación
app.get('/confirmation', (req, res) => {
  const { message } = req.query; // Obtener el mensaje de la consulta
  res.send(`
    <!DOCTYPE html>
    <html lang="en"> <!-- Cambiado a inglés -->
    <head>
        <meta charset="UTF-8">
        <title>Confirmation</title> <!-- Cambiado a inglés -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/css/bootstrap.min.css">
    </head>
    <body>
        <div class="container mt-5">
            <h1 class="text-center">${message}</h1>
            <div class="text-center">
                <a href="/" class="btn btn-primary">Return to form</a> <!-- Cambiado a inglés -->
            </div>
        </div>
    </body>
    </html>
  `);
});




// Ruta para verificar si el correo existe en la base de datos
app.post('/check-email', async (req, res) => {
  const { email } = req.body;
  try {
      const result = await pool.query('SELECT * FROM pet_owner WHERE email = $1', [email]);

      if (result.rowCount > 0) {
          // Si el correo existe, redirige a changePassword.html
          res.redirect('/changePassword');
      } else {
          // Si el correo no existe, redirige a una página de confirmación con un mensaje
          res.redirect('/confirmation?message=The%20email%20is%20not%20registered.');
      }
  } catch (error) {
      console.error('Error al verificar el correo:', error);
      res.status(500).send('Error al verificar el correo.');
  }
});

// Ruta para la página de confirmación
app.get('/confirmation', (req, res) => {
  const { message } = req.query; // Obtener el mensaje de la consulta
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Confirmation</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/css/bootstrap.min.css">
    </head>
    <body>
        <div class="container mt-5">
            <h1 class="text-center">${message}</h1>
            <div class="text-center">
                <a href="/password" class="btn btn-primary">Return to password reset</a>
            </div>
        </div>
    </body>
    </html>
  `);
});


// Ruta para cargar `changePassword.html`
app.get('/changePassword', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/html/changePassword.html'));
});

// Ruta para actualizar la contraseña en la base de datos
app.post('/update-password', async (req, res) => {
  const { newPassword } = req.body;
  const userId = 1; // ID del usuario encontrado, aquí podrías obtenerlo según la lógica de tu proyecto

  try {
      // Hashea la nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Actualiza la contraseña en la base de datos
      const result = await pool.query(
          'UPDATE pet_owner SET password = $1 WHERE id = $2',
          [hashedPassword, userId]
      );

      if (result.rowCount > 0) {
          res.send('<script>alert("Contraseña actualizada exitosamente."); window.location.href="/changePassword";</script>');
      } else {
          res.send('<script>alert("No se encontró el usuario."); window.location.href="/changePassword";</script>');
      }
  } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      res.status(500).send('<script>alert("Error al actualizar la contraseña."); window.location.href="/changePassword";</script>');
  }
});


// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
