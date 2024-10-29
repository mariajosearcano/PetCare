const mysql = require('mysql2');

// Crea una conexión a la base de datos
const connection = mysql.createConnection({
    host: 'bjx1hpzxdac8j87ji6tk-mysql.services.clever-cloud.com',
    user: 'uaux4nod8a8vlzvo',
    password: 'OEsn3ZhxuooWuMbaP7y6',
    database: 'bjx1hpzxdac8j87ji6tk'
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
