"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createError;
function createError(message, status, code) {
    const err = new Error(message);
    err.status = status;
    err.code = code;
    return err;
}
