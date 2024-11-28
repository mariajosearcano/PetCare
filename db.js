const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Crea una conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.HOST ?? 'junction.proxy.rlwy.net',
    port: process.env.PORT ?? '50251',
    user: process.env.MYSQLUSER ?? 'root',
    password: process.env.MYSQL_ROOT_PASSWORD ?? 'gSaORPcztMEEDuVUhVWDzTtqBJmNajZv',
    database: process.env.MYSQL_DATABASE ?? 'railway'
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
