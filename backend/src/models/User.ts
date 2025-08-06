import UserModel from "./UserModel";
import createError from "../utils/createError";
import mongoose from "mongoose";

class User {
    id: string | null;
    username: string;
    password: string;
    role: string;
    liked: string[];

    constructor(user: User) {
        this.id = user.id || null
        this.username = user.username
        this.password = user.password
        this.role = user.role
        this.liked = user.liked
    }

    static async verify(user: User) {
        if (!user.username) {return createError("Username can't be empty", 409, "INVALID_USERNAME")}
        if (!user.password) {return createError("Password can't be empty", 409, "INVALID_PASSWORD")}
        if (!Array.isArray(user.liked)) {user.liked = []}
        const userFound = await UserModel.findOne({ username: user.username })
        if (userFound) {
            return createError("Username already exist", 409, "USERNAME_TAKEN")
        }
        return null
    }

    static getAll(skip: number, limit: number) {
        return UserModel.find().skip(skip).limit(limit)
    }

    static getById(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null
        }
        return UserModel.findById(id)
    }

    static getByName(name: string) {
        return UserModel.findOne({ username: name })
    }

    static signUp(user: User) {
        return UserModel.create(user)
    }

    static update(id: string, user: User) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null
        }
        return UserModel.findByIdAndUpdate(id, user, { new: true, runValidators: true })
    }

    static delete(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null
        }
        return UserModel.findByIdAndDelete(id)
    }
}

export default User