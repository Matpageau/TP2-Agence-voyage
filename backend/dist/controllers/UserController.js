"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserController = {
    getAll: async (_req, res, next) => {
        try {
            const users = await User_1.default.getAll();
            res.status(200).json(users);
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
                res.status(403).send("INVALID_USERNAME");
                /* const error = {message: "INVALID_USERNAME", status: 403}
                throw error */
            }
            if (user?.password !== password) {
                res.status(403).send("INVALID_PASSWORD");
                /* const error = {message: "INVALID_PASSWORD", status: 403}
                throw error */
            }
            const payload = { id: user?.id };
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
            res.cookie("token", token, {
                httpOnly: true
            });
            res.status(200).send(token);
        }
        catch (err) {
            next(err);
        }
    },
    signUp: async (req, res, next) => {
        try {
            const user = req.body;
            User_1.default.verify(user);
            user.role = "user";
            const newUser = await User_1.default.signUp(user);
            res.status(200).json(newUser);
        }
        catch (err) {
            next(err);
        }
    }
};
exports.default = UserController;
