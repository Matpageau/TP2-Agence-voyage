import express from "express"
import UserController from "../controllers/UserController"

const UserRouter = express.Router()

UserRouter.get("/", UserController.getAll)
UserRouter.get("/:userId", UserController.getById)
UserRouter.get("/me", UserController.getByToken)
UserRouter.put("/:userId", UserController.update)
UserRouter.delete("/:userId", UserController.delete)

export default UserRouter