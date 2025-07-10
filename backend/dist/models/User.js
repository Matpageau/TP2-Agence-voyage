"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("./UserModel"));
class User {
    constructor(user) {
        this.id = user.id || null;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }
    static async verify(user) {
        let error = null;
        if (!user.username) {
            error = "INVALID_USERNAME";
        }
        if (!user.password) {
            error = "INVALID_PASSWORD";
        }
        if (error) {
            throw Object.assign(new Error(error), { status: 400 });
        }
    }
    static async getAll() {
        const users = await UserModel_1.default.find();
        if (!users) {
            throw Object.assign(new Error("USER_NOT_FOUND"), { status: 404 });
        }
        return users;
    }
    static async getByName(usernameIn) {
        const user = await UserModel_1.default.findOne({ username: usernameIn });
        return user;
    }
    static async signUp(user) {
        const newUser = await UserModel_1.default.create(user);
        return newUser;
    }
}
exports.default = User;
