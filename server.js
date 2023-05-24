// Modules Core
const path = require("path");

// NPM
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// environment extract
dotenv.config({ path: path.join(__dirname, "./.env") });

// App instace
const { app } = require(path.join(__dirname, "./app.js"));

// Koneksi Mongodb
(async function () {
    try {
        await mongoose.connect("mongodb://localhost:27017/moviematic");
        console.log("Database Connected");
    } catch (error) {
        throw error;
    }
})();


app.listen(3000, () => {
    console.log("Server is Listening at http://localhost:3000");
})