"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createError;
function createError(message, status, code) {
    const err = new Error(message);
    err.status = !isNaN(status) ? status : 500;
    err.code = code || "INTERNAL_SERVER_ERROR";
    return err;
}
