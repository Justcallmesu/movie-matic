// Module
const path = require("path");

// NPM
const express = require("express");
const asyncErrorHandler = require("../Error/AsyncErrorHandler");

// auth
const { isAdmin } = require(path.join(__dirname, "../auth/auth.js"));

// error Handler
const AsyncErrorHandler = require(path.join(__dirname, "../Error/AsyncErrorHandler.js"));

// Controller
const { getMovies, postMovies } = require(path.join(__dirname, "../representation/movies.js"));

// multer
const { upload } = require(path.join(__dirname, "../app.js"));

// Photo Process
const savePictures = require(path.join(__dirname, "../functions/SavePictures.js"));

// Router
const router = express.Router();

router.route("/")
    .get(getMovies)
    .post(isAdmin, upload.single("poster_film"), asyncErrorHandler(savePictures), AsyncErrorHandler(postMovies));

module.exports = router;