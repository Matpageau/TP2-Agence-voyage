"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CartModel_1 = __importDefault(require("./CartModel"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "manager", "admin"]
    },
    liked: {
        type: [String],
        default: []
    },
    cart: {
        type: [CartModel_1.default],
        default: []
    }
}, { timestamps: true });
const UserModel = mongoose_1.default.model("users", UserSchema);
exports.default = UserModel;
