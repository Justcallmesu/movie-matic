const express = require("express");
const path = require("path");

// Controller
const { getMovies } = require(path.join(__dirname, "../representation/movies.js"));

// Router
const router = express.Router();


router.route("/").get(getMovies);


module.exports = router;