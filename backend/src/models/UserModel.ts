import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
})

const UserModel = mongoose.model("users", UserSchema)

export default UserModel