import express, { NextFunction, Request, Response } from "express"
import UserController from "../controllers/UserController"

const UserRouter = express.Router()

UserRouter.get("/", UserController.getAll)

export default UserRouter