import express from "express"
import UserController from "../controllers/UserController"

const UserRouter = express.Router()

UserRouter.get("/", UserController.getAll)
UserRouter.get("/me", UserController.getByToken)
UserRouter.patch("/role/:userId", UserController.modifyRole)
UserRouter.get("/:userId", UserController.getById)
UserRouter.put("/:userId", UserController.update)
UserRouter.delete("/:userId", UserController.delete)
UserRouter.patch("/:userId", UserController.handleLike)

export default UserRouter