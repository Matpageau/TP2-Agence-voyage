"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("./UserModel"));
const createError_1 = __importDefault(require("../utils/createError"));
class User {
    constructor(user) {
        this.id = user.id || null;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }
    static async verify(user) {
        if (!user.username) {
            return (0, createError_1.default)("Username can't be empty", 409, "INVALID_USERNAME");
        }
        if (!user.password) {
            return (0, createError_1.default)("Password can't be empty", 409, "INVALID_PASSWORD");
        }
        const userFound = await UserModel_1.default.findOne({ username: user.username });
        if (userFound) {
            return (0, createError_1.default)("Username already exist", 409, "USERNAME_TAKEN");
        }
        else
            return null;
    }
    static async getAll() {
        return await UserModel_1.default.find();
    }
    static async getById(id) {
        return await UserModel_1.default.findById(id);
    }
    static async getByName(name) {
        return await UserModel_1.default.findOne({ username: name });
    }
    static async signUp(user) {
        return await UserModel_1.default.create(user);
    }
    static async update(id, user) {
        return await UserModel_1.default.findByIdAndUpdate(id, user, { new: true, runValidators: true });
    }
    static async delete(id) {
        return await UserModel_1.default.findByIdAndDelete(id);
    }
}
exports.default = User;
