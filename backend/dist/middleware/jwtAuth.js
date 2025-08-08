"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createError_1 = __importDefault(require("../utils/createError"));
const jwtAuth = (req, _, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return next((0, createError_1.default)("Invalid token", 401, "INVALID_TOKEN"));
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return next((0, createError_1.default)("Invalid token", 401, "INVALID_TOKEN"));
    }
};
exports.jwtAuth = jwtAuth;
