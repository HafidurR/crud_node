const mysql = require("mysql2");
require("dotenv").config()

const koneksi = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: '',
    database: process.env.DB_NAME
});

module.exports = koneksi;