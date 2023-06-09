// Modules
const path = require("path");

// NPM
const express = require("express");
const cookieParser = require("cookie-parser");
const multer = require("multer");

// Instance Express
const app = express();

const memoryStorage = multer.memoryStorage();

// Multer Instance
const upload = multer({
    storage: memoryStorage,
});

module.exports = { upload };
// Error Handler
const GlobalErrorHandler = require(path.join(__dirname, "./Error/GlobalErrorHandler.js"));

// Middleware
app.use(express.static("assets"))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());

// Router
const movieRouter = require(path.join(__dirname, "./routes/movie_route.js"));
const userRouter = require(path.join(__dirname, "./routes/user_route.js"));
const pembayaranRouter = require(path.join(__dirname, "./routes/pembayaran_route.js"));

// Routing
app.get("/", (req, res) => {
    res.json({
        status: 200,
        message: "Server is up and running"
    })
});
app.use("/api/v1/movie", movieRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/pembayaran", pembayaranRouter);

app.use("*", (_, res) => {
    res.status(404).json({
        status: "Client Error",
        message: "Endpoint yang dituju tidak ada"
    })
})

// Global Error Handler
app.use(GlobalErrorHandler);


module.exports = { app };



