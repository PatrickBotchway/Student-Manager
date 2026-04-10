const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'personalsettings',
    database: 'student_manager',
    waitForConnections: true,
    connectionLimit: 10
}, console.log('Connected to student_manager database...'));

module.exports = pool;