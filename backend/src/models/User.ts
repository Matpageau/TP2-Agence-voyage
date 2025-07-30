import UserModel from "./UserModel";
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
        return null
    }

    static getAll() {
        return UserModel.find()
    }

    static getById(id: String) {
        return UserModel.findById(id)
    }

    static getByName(name: String) {
        return UserModel.findOne({ username: name })
    }

    static signUp(user: User) {
        return UserModel.create(user)
    }

    static update(id: String, user: User) {
        return UserModel.findByIdAndUpdate(id, user, { new: true, runValidators: true })
    }

    static delete(id: String) {
        return UserModel.findByIdAndDelete(id)
    }
}

export default User