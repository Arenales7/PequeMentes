const mysql = require('mysql2/promise');
require('dotenv').config();

console.log('Host:', process.env.DB_HOST);
console.log('Usuario:', process.env.DB_USER);
console.log('Base de datos:', process.env.DB_NAME);
console.log('¿Contraseña cargada?:', Boolean(process.env.DB_PASSWORD));

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//conexion

pool.getConnection()
    .then(connection => {
        console.log('Conexión con MySQL establecida');
        connection.release();
    })
    .catch(error => {
        console.error('Error al conectar con MySQL:', error.message);
    })

module.exports = pool;
