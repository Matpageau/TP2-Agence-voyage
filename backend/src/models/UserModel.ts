import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
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
    }
})

const UserModel = mongoose.model("users", UserSchema)

export default UserModel