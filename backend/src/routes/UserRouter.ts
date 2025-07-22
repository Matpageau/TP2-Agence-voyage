import express from "express"
import UserController from "../controllers/UserController"

const UserRouter = express.Router()

UserRouter.get("/", UserController.getAll)
UserRouter.get("/:id", UserController.getById)
UserRouter.put("/:id", UserController.update)
UserRouter.delete("/:id", UserController.delete)

export default UserRouter