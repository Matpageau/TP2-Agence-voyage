"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createError_1 = __importDefault(require("../utils/createError"));
const UserController = {
    async getAll(_req, res, next) {
        try {
            const users = await User_1.default.getAll();
            if (users.length === 0) {
                return next((0, createError_1.default)("No user found in database", 404, "USER_NOT_FOUND"));
            }
            res.status(200).json(users);
        }
        catch (err) {
            next(err);
        }
    },
    async getById(req, res, next) {
        try {
            const user = await User_1.default.getById(req.params.id);
            if (!user) {
                return next((0, createError_1.default)("User not found", 404, "USER_NOT_FOUND"));
            }
            res.status(200).json(user);
        }
        catch (err) {
            next(err);
        }
    },
    async getByName(req, res, next) {
        try {
            const user = await User_1.default.getByName(req.body.username);
            if (!user) {
                return next((0, createError_1.default)("User not found", 404, "USER_NOT_FOUND"));
            }
            res.status(200).json(user);
        }
        catch (err) {
            next(err);
        }
    },
    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const user = await User_1.default.getByName(username);
            if (!user) {
                return next((0, createError_1.default)("User not found", 404, "USER_NOT_FOUND"));
            }
            if (user.password !== password) {
                return next((0, createError_1.default)("Invalid password", 401, "INVALID_PASSWORD"));
            }
            const payload = { id: user.id };
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
            res.cookie("token", token, {
                httpOnly: true
            });
            return res.status(200).send(token);
        }
        catch (err) {
            next(err);
        }
    },
    async signUp(req, res, next) {
        try {
            const user = req.body;
            const err = await User_1.default.verify(user);
            if (err) {
                return next(err);
            }
            if (!user.role) {
                user.role = "user";
            }
            const newUser = await User_1.default.signUp(user);
            res.status(200).json(newUser);
        }
        catch (err) {
            next(err);
        }
    },
    async update(req, res, next) {
        try {
            const user = await User_1.default.update(req.params.id, req.body);
            if (!user) {
                return next((0, createError_1.default)("User not found", 404, "USER_NOT_FOUND"));
            }
            res.status(200).json(user);
        }
        catch (err) {
            next(err);
        }
    },
    async delete(req, res, next) {
        try {
            const user = await User_1.default.delete(req.params.id);
            res.status(200).json(`User ${user?.username} successfully deleted`);
        }
        catch (err) {
            next(err);
        }
    }
};
exports.default = UserController;
