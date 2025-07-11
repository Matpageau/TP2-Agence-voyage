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
        const userFound = await UserModel.findOne({ username: user.username })
        if (userFound) {return "USERNAME_TAKEN"}
        return null
    }

    static async getAll() {
        const users = await UserModel.find()
        if (!users) {
            throw new Error("USER_NOT_FOUND")
        }
        return users
    }

    static async getByName(name: String) {
      const user = await UserModel.findOne({ username: name })
      return user
    }

    static async signUp(user: User) {
        const newUser = await UserModel.create(user)
        return newUser
    }
}

export default User