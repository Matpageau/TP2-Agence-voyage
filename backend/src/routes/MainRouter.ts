import express from "express"
import UserRouter from "./UserRouter"
import UserController from "../controllers/UserController"

const MainRouter = express.Router()

MainRouter.use("/users", UserRouter)
MainRouter.post("/signup", UserController.signUp)
MainRouter.post("/login", UserController.login)

export default MainRouter