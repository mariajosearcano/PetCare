// Importa el paquete mysql2
const mysql = require('mysql2');
const express = require('express');

// Crea una conexión a la base de datos
const connection = mysql.createConnection({
  host: 'bcy5sx8g1vu3tp1vdxtm-mysql.services.clever-cloud.com',        // Dirección del servidor de MySQL
  user: 'u4x7yjeirlpjgnln',      
  password: 'y1MnwMiyPWppIjnVcYJW', 
  database: 'bcy5sx8g1vu3tp1vdxtm' 
});

// Inicializa la aplicación Express
const app = express();

// Usa el analizador de JSON integrado en Express
app.use(express.json());

// Usa el analizador de datos codificados en URL integrado en Express
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta assets
app.use('/assets', express.static('assets'));
app.use('/src/css', express.static(__dirname + '/src/css'));


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Consultar la tabla 'pet_owner'
    let result = await connection.query(
      'SELECT * FROM "pet_owner" WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      return res.sendFile(__dirname + '/src/html/petOwner.html');
    }

    // Consultar la tabla 'veterinarians' si no está en 'pet_owner'
    result = await connection.query(
      'SELECT * FROM "veterinarians" WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      return res.sendFile(__dirname + '/src/html/manageUsers.html');
    }

    // Consultar la tabla 'clinic_administrator' si no está en 'veterinarians'
    result = await connection.query(
      'SELECT * FROM "clinic_administrator" WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      return res.sendFile(__dirname + '/src/html/admin.html');
    }

    // Si no se encuentra en ninguna tabla, enviar mensaje de error
    res.send('Correo o contraseña incorrectos');
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
    await connection.query(
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
const port = 3008;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
