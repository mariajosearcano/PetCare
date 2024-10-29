const mysql = require('mysql2');

// Crea una conexión a la base de datos
const connection = mysql.createConnection({
    host: 'bcy5sx8g1vu3tp1vdxtm-mysql.services.clever-cloud.com',
    user: 'u4x7yjeirlpjgnln',
    password: 'y1MnwMiyPWppIjnVcYJW',
    database: 'bcy5sx8g1vu3tp1vdxtm'
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
