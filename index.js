// Importa el paquete mysql2
const mysql = require('mysql2');
const express = require('express');

// Inicializa la aplicación Express
const app = express();

// Usa el analizador de JSON integrado en Express
app.use(express.json());

// Usa el analizador de datos codificados en URL integrado en Express
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta assets
app.use('/assets', express.static('assets'));
app.use('/src/css', express.static(__dirname + '/src/css'));

// Crea una conexión a la base de datos
const pool = mysql.createPool({
    host: 'bcy5sx8g1vu3tp1vdxtm-mysql.services.clever-cloud.com',
    user: 'u4x7yjeirlpjgnln',
    password: 'y1MnwMiyPWppIjnVcYJW',
    database: 'bcy5sx8g1vu3tp1vdxtm'
});

// Ruta para la página principal (base.html)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/html/base.html');
});

// get all users
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM person');
    res.json(rows);
  } catch (err) {
    console.error('Error getting users:', err);
    res.status(500).send('Error getting users');
  }
});

// create a new user
app.post('/create', async (req, res) => {
  const { name, age } = req.body;

  try {
    const [result] = await pool.execute('INSERT INTO person (name, age) VALUES (?, ?)', [name, age]);
    res.send(`New user inserted with ID: ${result.insertId}`);
  } catch (err) {
    console.error('Error inserting user:', err);
    res.status(500).send('Error inserting user');
  }
});

// get a user by ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.execute('SELECT * FROM person WHERE id = ?', [id]);

    if (rows.length) {
      res.json(rows[0]);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error('Error getting user:', err);
    res.status(500).send('Error getting user');
  }
});

// update a user by ID
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  try {
    const [result] = await pool.execute('UPDATE person SET name = ?, age = ? WHERE id = ?', [name, age, id]);

    if (result.affectedRows) {
      res.send('User updated successfully');
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).send('Error updating user');
  }
});

// delete a user by ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.execute('DELETE FROM person WHERE id = ?', [id]);

    if (result.affectedRows) {
      res.send('User deleted successfully');
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).send('Error deleting user');
  }
});





////
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
