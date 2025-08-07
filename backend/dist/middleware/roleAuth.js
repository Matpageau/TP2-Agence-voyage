"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleAuth = void 0;
const createError_1 = __importDefault(require("../utils/createError"));
const roleAuth = (req, _, next) => {
    const user = req.user;
    if (!user || user.role !== 'admin' || user.role !== 'admin') {
        return next((0, createError_1.default)("Unauthorized", 401, "UNAUTHORIZED"));
    }
    next();
};
exports.roleAuth = roleAuth;
