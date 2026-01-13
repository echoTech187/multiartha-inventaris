const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'multiartha',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

if (process.env.NODE_ENV !== 'production') {
    db.on('connection', function (connection) {
        console.log('New connection %d established', connection.threadId);
    });

    db.on('release', function (connection) {
        console.log('Connection %d released', connection.threadId);
    });
}

module.exports = db;