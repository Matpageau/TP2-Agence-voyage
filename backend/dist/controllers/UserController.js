"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createError_1 = __importDefault(require("../utils/createError"));
const Travel_1 = __importDefault(require("../models/Travel"));
const UserController = {
    async getAll(req, res, next) {
        try {
            const max = req.params.max;
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
            const userId = req.params.id;
            const user = await User_1.default.getById(userId);
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
            const username = req.body.username;
            const user = await User_1.default.getByName(username);
            if (!user) {
                return next((0, createError_1.default)("User not found", 404, "USER_NOT_FOUND"));
            }
            res.status(200).json(user);
        }
        catch (err) {
            next(err);
        }
    },
    async getByToken(req, res, next) {
        try {
            const token = req.cookies.token;
            if (!token) {
                return next((0, createError_1.default)("User not found", 404, "USER_NOT_FOUND"));
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = await User_1.default.getById(decoded.id);
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
            const data = req.body;
            const err = await User_1.default.verify(data);
            if (err) {
                return next(err);
            }
            data.role || (data.role = "user");
            const user = await User_1.default.signUp(data);
            res.status(200).json(user);
        }
        catch (err) {
            next(err);
        }
    },
    async update(req, res, next) {
        try {
            const userId = req.params.id;
            const data = req.body;
            const err = await User_1.default.verify(data);
            if (err) {
                return next(err);
            }
            const user = await User_1.default.update(userId, data);
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
            const userId = req.params.userId;
            const user = await User_1.default.delete(userId);
            if (!user) {
                return next((0, createError_1.default)("User not found", 404, "USER_NOT_FOUND"));
            }
            res.status(200).json(`User ${user.username} deleted`);
        }
        catch (err) {
            next(err);
        }
    },
    async handleLike(req, res, next) {
        try {
            const userId = req.params.userId;
            const { action, travelId } = req.body;
            switch (action) {
                case 'like':
                    await like(userId, travelId);
                    break;
                case 'dislike':
                    await dislike(userId, travelId);
                    break;
                default:
                    return next((0, createError_1.default)("Invalid requested action", 400, "INVALID_ACTION"));
            }
            res.status(200).json();
        }
        catch (err) {
            next(err);
        }
    }
};
exports.default = UserController;
async function like(userId, travelId) {
    const [user, travel] = await Promise.all([
        User_1.default.getById(userId),
        Travel_1.default.getById(travelId)
    ]);
    if (!user) {
        return (0, createError_1.default)("User not found", 404, "USER_NOT_FOUND");
    }
    if (!travel) {
        throw (0, createError_1.default)("Travel not found", 404, "TRAVEL_NOT_FOUND");
    }
    user.liked.push(travelId);
    await user.save();
}
async function dislike(userId, travelId) {
    let user = await User_1.default.getById(userId);
    if (!user) {
        throw (0, createError_1.default)("User not found", 404, "USER_NOT_FOUND");
    }
    const index = user.liked.indexOf(travelId);
    if (index !== -1) {
        user.liked.splice(index, 1);
        await user.save();
    }
}
