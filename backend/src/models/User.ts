import UserModel from "./UserModel"

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
        let error = null
        if (!user.username) {error = "INVALID_USERNAME"}
        if (!user.password) {error = "INVALID_PASSWORD"}
        if (error) {
            throw Object.assign(new Error(error), { status: 400})
        }
    }

    static async getAll() {
        const users = await UserModel.find()
        if (!users) {
            throw Object.assign(new Error("USER_NOT_FOUND"), { status: 404})
        }
        return users
    }

    static async getByName(usernameIn: String) {
        const user = await UserModel.findOne({ username: usernameIn })
        return user
    }

    static async signUp(user: User) {
        const newUser = await UserModel.create(user)
        return newUser
    }
    
}

export default User