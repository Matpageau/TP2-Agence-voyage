"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("./UserModel"));
const createError_1 = __importDefault(require("../utils/createError"));
const mongoose_1 = __importDefault(require("mongoose"));
const Travel_1 = __importDefault(require("./Travel"));
class User {
    constructor(user) {
        this.id = user.id || null;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
        this.liked = user.liked;
        this.cart = user.cart;
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
        if (!Array.isArray(user.cart)) {
            user.cart = [];
        }
        const userFound = await UserModel_1.default.findOne({ username: user.username });
        if (userFound) {
            return (0, createError_1.default)("Username already exist", 409, "USERNAME_TAKEN");
        }
        return null;
    }
    static getAll() {
        return UserModel_1.default.find();
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
    static async addToLiked(userId, travelId) {
        const [user, travel] = await Promise.all([
            User.getById(userId),
            Travel_1.default.getById(travelId)
        ]);
        if (!user) {
            throw (0, createError_1.default)("User not found", 404, "USER_NOT_FOUND");
        }
        if (!travel) {
            throw (0, createError_1.default)("Travel not found", 404, "TRAVEL_NOT_FOUND");
        }
        if (!user.liked.includes(travelId)) {
            user.liked.push(travelId);
            await user.save();
        }
    }
    static async removeFromLiked(userId, travelId) {
        const user = await User.getById(userId);
        if (!user) {
            throw (0, createError_1.default)("User not found", 404, "USER_NOT_FOUND");
        }
        const index = user.liked.indexOf(travelId);
        if (index !== -1) {
            user.liked.splice(index, 1);
            await user.save();
        }
    }
    static async addToCart(userId, travelId, quantity = 1) {
        const [user, travel] = await Promise.all([
            User.getById(userId),
            Travel_1.default.getById(travelId)
        ]);
        if (!user) {
            throw (0, createError_1.default)("User not found", 404, "USER_NOT_FOUND");
        }
        if (!travel) {
            throw (0, createError_1.default)("Travel not found", 404, "TRAVEL_NOT_FOUND");
        }
        if (isNaN(quantity) || quantity < 1) {
            throw (0, createError_1.default)("Invalid quantity", 400, "INVALID_QUANTITY");
        }
        const existingItem = user.cart.find(item => item.travelId === travelId);
        if (existingItem) {
            existingItem.quantity += quantity;
        }
        else {
            user.cart.push({
                travelId: travelId,
                quantity: quantity
            });
        }
        await user.save();
        return `${user.username} added ${quantity} tickets to ${travel.id} to cart`;
    }
    static async deleteFromCart(userId, travelId) {
        const user = await User.getById(userId);
        if (!user) {
            throw (0, createError_1.default)("User not found", 404, "USER_NOT_FOUND");
        }
        const index = user.cart.findIndex(item => item.travelId === travelId);
        if (index !== -1) {
            user.cart.slice(index, 1);
            await user.save();
            return `${user.username} deleted ${travelId} from cart`;
        }
        else {
            throw (0, createError_1.default)("Travel not found in cart", 404, "TRAVEL_NOT_FOUND");
        }
    }
}
exports.default = User;
