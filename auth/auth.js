// Modules
const path = require("path");

// NPM
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// class
const ErrorResponse = require(path.join(__dirname, "../modules/error.js"));

// Database
const users = require(path.join(__dirname, "../resources/users.js"));

exports.isAdmin = async (req, res, next) => {
    const { cookies: { userToken } } = req;
    const error = new ErrorResponse(400, "Please Log in")

    if (!userToken) return next(error);

    try {
        const { _id } = jwt.verify(userToken, process.env.jwtsecret);

        const foundUser = await users.findOne({ _id }).select("+roles");

        if (!foundUser) return next(new ErrorResponse(404, "User Doesnt Exist"));

        if (foundUser.roles !== "admin") return next(new ErrorResponse(404, "User Doesnt Authorized to do this action"));

        next();
    } catch (error) {
        return next(error)
    }
};

exports.isValidObjectId = (req, res, next) => {
    const { params: { _id } } = req;
    if (!mongoose.Types.ObjectId.isValid(_id)) return next(new ErrorResponse(400, "Id yang digunakan tidak valid"));
    next();
}