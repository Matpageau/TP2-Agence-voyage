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
        const userFound = await UserModel_1.default.findOne({ username: user.username });
        if (userFound) {
            return "USERNAME_TAKEN";
        }
        return null;
    }
    static async getAll() {
        const users = await UserModel_1.default.find();
        if (!users) {
            throw new Error("USER_NOT_FOUND");
        }
        return users;
    }
    static async getByName(name) {
        const user = await UserModel_1.default.findOne({ username: name });
        return user;
    }
    static async signUp(user) {
        const newUser = await UserModel_1.default.create(user);
        return newUser;
    }
}
exports.default = User;
