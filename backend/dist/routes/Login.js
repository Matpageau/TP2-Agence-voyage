"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const Login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User_1.default.getByName(username);
        if (user?.password !== password) {
            const error = { message: "INVALID_PASSWORD", status: 403 };
            throw error;
        }
        const payload = { username: username, role: user?.role };
        const token = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" });
        res.cookie("token", token, {
            httpOnly: true
        });
        return res.status(200);
    }
    catch (err) {
        console.log("===========");
        console.log(err);
        console.log("===========");
        next(err);
    }
};
exports.default = Login;
