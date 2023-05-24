module.exports = class ErrorResponse {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.status = String(statusCode).startsWith("4") ? "Client Error" : "Server Error";
        this.message = message;
    }
};