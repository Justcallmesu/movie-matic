// Modules
const path = require("path");

// NPM
const { Error } = require("mongoose");

// Error
const ErrorResponse = require(path.join(__dirname, "../modules/Error.js"));
function constructError(err) {
    if (err instanceof Error.ValidationError) {
        let message = "";

        Object.values(err.errors).forEach((value) => {
            message += `${value.message}, `
        });

        return new ErrorResponse(400, message);
    }

    if (err.type === "entity.parse.failed") {
        return new ErrorResponse(400, "JSON tidak valid");
    }
}

function GlobalErrorHandler(err, req, res, next) {
    const error = err?.isCustom ? err : constructError(err);
    console.log(err);
    res.status(error.statusCode).json(error);
}

module.exports = GlobalErrorHandler;