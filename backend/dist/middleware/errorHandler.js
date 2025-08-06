"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
function errorHandler(err, _req, res, _next) {
    const { message, status, code } = err;
    res.status(status).json({ error: { message, status, code } });
}
