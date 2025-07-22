"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
function errorHandler(err, _req, res, _next) {
    const status = err.status || 500;
    const code = err.code || "INTERNAL_SERVER_ERROR";
    res.status(status).json({
        error: {
            message: err.message,
            code: code,
            status: status
        }
    });
}
