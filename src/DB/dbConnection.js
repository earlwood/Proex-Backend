const mysql = require('mysql');

const db = mysql.createPool({
    connectionLimit: process.env.CONNECTION_LIMIT,
    multipleStatements: process.env.MULTIPLE_STATEMENTS,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST, //Public IP of the host
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
});

//Revisar conexión DB
db.getConnection((error) => {
    if(error){
        console.log(error);
        return;
    }
    else{
        console.log('Base de datos corriendo!');
    }
});

module.exports = db;