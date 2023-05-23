// Modules
const path = require("path");

// NPM
const express = require("express");
const cookieParser = require("cookie-parser");

// Instance Express
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
const movieRouter = require(path.join(__dirname, "./routes/movie_route.js"));
const userRouter = require(path.join(__dirname, "./routes/user_route.js"));

// Routing
app.get("/", (req, res) => {
    res.json({
        status: 200,
        message: "Server is up and running"
    })
});
app.use("/api/v1/movie", movieRouter);
app.use("/api/v1/user", userRouter);

// Global Error Handler
app.use((err) => {

})


module.exports = app;



