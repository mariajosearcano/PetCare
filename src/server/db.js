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
        console.error('Error conectando a la base de datos: ', err); 
        return;
    }
    console.log('Conexión a la base de datos MySQL establecida');
});

// Exporta la conexión para que pueda ser utilizada por otros archivos
module.exports = connection;
