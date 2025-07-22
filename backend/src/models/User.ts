import UserModel from "./UserModel"
import createError from "../utils/createError";

class User {
    id: String;
    username: String;
    password: String;
    role: String;

    constructor(user: User) {
        this.id = user.id || null
        this.username = user.username
        this.password = user.password
        this.role = user.role
    }

    static async verify(user: User) {
        if (!user.username) {return createError("Username can't be empty", 409, "INVALID_USERNAME")}
        if (!user.password) {return createError("Password can't be empty", 409, "INVALID_PASSWORD")}
        const userFound = await UserModel.findOne({ username: user.username })
        if (userFound) {
            return createError("Username already exist", 409, "USERNAME_TAKEN")
        }
        else return null
    }

    static async getAll() {
        return await UserModel.find()
    }

    static async getById(id: String) {
        return await UserModel.findById(id)
    }

    static async getByName(name: String) {
        return await UserModel.findOne({ username: name })
    }

    static async signUp(user: User) {
        return await UserModel.create(user)
    }

    static async update(id: String, user: User) {
        return await UserModel.findByIdAndUpdate(id, user, { new: true, runValidators: true })
    }

    static async delete(id: String) {
        return await UserModel.findByIdAndDelete(id)
    }
}

export default User