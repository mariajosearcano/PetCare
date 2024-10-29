const mysql = require('mysql2');

// Crea una conexión a la base de datos
const connection = mysql.createConnection({
    host: 'bcy5sx8g1vu3tp1vdxtm-mysql.services.clever-cloud.com',
    user: 'u4x7yjeirlpjgnln',
    password: 'y1MnwMiyPWppIjnVcYJW',
    database: 'bcy5sx8g1vu3tp1vdxtm'
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

// Ejecutar una consulta
connection.query('SELECT * FROM person', (err, results, fields) => {
    if (err) {
        console.error('Error al ejecutar la consulta:', err);
        return;
    }
    console.log('Resultados de la consulta:', results);
});
