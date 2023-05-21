const express = require("express");

// Instance Express
const app = express();

// Routing
app.get("/", (req, res) => {
    res.json({
        status: 200,
        message: "Server is up and running"
    })
})

module.exports = app;



