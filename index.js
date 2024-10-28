const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

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
    // Consultar la tabla 'pet_owner' para verificar si el email y la contraseña son correctos
    const result = await pool.query(
      'SELECT * FROM "pet_owner" WHERE email = $1 AND password = $2',
      [email, password]
    );

    // Si se encuentra un registro, se redirige a petOwner.html
    if (result.rows.length > 0) {
      res.sendFile(__dirname + '/src/html/petOwner.html');
    } else {
      res.send('Correo o contraseña incorrectos');
    }
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
    res.send('Datos insertados correctamente');
  } catch (err) {
    console.error(err);
    res.send('Error al insertar los datos');
  }
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
