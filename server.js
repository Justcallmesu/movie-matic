// Modules Core
const path = require("path");

// NPM
const mysql = require("mysql");

// App instace
const app = require(path.join(__dirname, "./app.js"));

// MYSQL Connection
const connection = mysql.createConnection({
    database: "movie_matic",
    user: "root",
    password: "",
    connectTimeout: 10000, // Database Timeout setelah 10 detik
    host: "localhost"
});

// Inisiasi Koneksi Dengan MYSQL
connection.connect((error) => {
    if (error) throw error;
    console.log("Connected");
});

app.listen(3000, () => {
    console.log("Server Is listening at http://localhost:3000");
})

module.exports = { connection };