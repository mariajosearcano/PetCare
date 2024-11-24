const mysql = require('mysql2');

// Crea una conexión a la base de datos
const connection = mysql.createConnection({
    host: 'junction.proxy.rlwy.net',
    port: '50251',
    user: 'root',
    password: 'gSaORPcztMEEDuVUhVWDzTtqBJmNajZv',
    database: 'railway'
});

// establecer la conexión
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database', err); 
        return;
    }
    console.log('MySQL database connection established');
});

// Exporta la conexión para que pueda ser utilizada por otros archivos
module.exports = connection;
