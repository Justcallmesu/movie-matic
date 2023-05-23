const express = require("express");
const path = require("path");

// Controller
const { register, login } = require(path.join(__dirname, "../representation/users.js"));

// Router
const router = express.Router();


router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;