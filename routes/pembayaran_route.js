// Module
const path = require("path");

// NPM
const express = require("express");
const asyncErrorHandler = require("../Error/AsyncErrorHandler");

// auth
const { isValidObjectId } = require(path.join(__dirname, "../auth/auth.js"));

// error Handler
const AsyncErrorHandler = require(path.join(__dirname, "../Error/AsyncErrorHandler.js"));

// Controller
const { getPembayaran, postPembayaran } = require(path.join(__dirname, "../representation/pembayaran.js"));

// Router
const router = express.Router();

router.route("/").post(asyncErrorHandler(postPembayaran))

router.get("/:_id").get(isValidObjectId, asyncErrorHandler(getPembayaran));

module.exports = router;