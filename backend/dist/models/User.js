"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("./UserModel"));
const createError_1 = __importDefault(require("../utils/createError"));
const mongoose_1 = __importDefault(require("mongoose"));
class User {
    constructor(user) {
        this.id = user.id || null;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
        this.liked = user.liked;
    }
    static async verify(user) {
        if (!user.username) {
            return (0, createError_1.default)("Username can't be empty", 409, "INVALID_USERNAME");
        }
        if (!user.password) {
            return (0, createError_1.default)("Password can't be empty", 409, "INVALID_PASSWORD");
        }
        if (!Array.isArray(user.liked)) {
            user.liked = [];
        }
        const userFound = await UserModel_1.default.findOne({ username: user.username });
        if (userFound) {
            return (0, createError_1.default)("Username already exist", 409, "USERNAME_TAKEN");
        }
        return null;
    }
    static getAll(skip, limit) {
        return UserModel_1.default.find().skip(skip).limit(limit);
    }
    static getById(id) {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return null;
        }
        return UserModel_1.default.findById(id);
    }
    static getByName(name) {
        return UserModel_1.default.findOne({ username: name });
    }
    static signUp(user) {
        return UserModel_1.default.create(user);
    }
    static update(id, user) {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return null;
        }
        return UserModel_1.default.findByIdAndUpdate(id, user, { new: true, runValidators: true });
    }
    static delete(id) {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return null;
        }
        return UserModel_1.default.findByIdAndDelete(id);
    }
}
exports.default = User;
