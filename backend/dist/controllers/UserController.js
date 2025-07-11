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
                return res.status(403).send({ code: "USER_NOT_FOUND" });
            }
            if (user.password !== password) {
                return res.status(403).send({ code: "INVALID_PASSWORD" });
            }
            const payload = { id: user?.id };
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
    signUp: async (req, res, next) => {
        try {
            const user = req.body;
            const error = await User_1.default.verify(user);
            if (error) {
                return res.status(400).send({ code: error });
            }
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
