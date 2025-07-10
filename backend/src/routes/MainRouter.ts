import { Router, Request, Response, NextFunction } from "express"
import UserRouter from "./UserRouter"
import UserController from "../controllers/UserController"

const MainRouter = Router()

MainRouter.use("/users", UserRouter)
MainRouter.post("/signup", UserController.signUp)
MainRouter.post("/login", UserController.login)

export default MainRouter