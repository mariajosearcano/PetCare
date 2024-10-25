const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

// Inicializa la aplicación Express
const app = express();

// Middleware para procesar los datos enviados por el formulario (POST)
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',        
  host: 'localhost',         // Host donde corre PostgreSQL
  database: 'bbd_owner',     // Cambia por el nombre de tu base de datos
  password: 'madiar2003',    // Cambia por tu contraseña de PostgreSQL
  port: 5432,                // Puerto por defecto de PostgreSQL
});

// Ruta para servir el formulario (index.html)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/html/formsPetOwner.html');  // Cambia esta ruta según la ubicación de tu HTML
});

// Ruta para manejar el envío del formulario
app.post('/submit-form', async (req, res) => {
  const { name, lastName, document, email, address, phone, password } = req.body;

  try {
    // Inserta los datos en la tabla 'pet-owner'
    const result = await pool.query(
      'INSERT INTO "pet-owner" (name, last_name, id, email, address, phone_number, password) VALUES ($1, $2, $3, $4, $5, $6, $7)',
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
