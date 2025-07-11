import { NextFunction, Request, Response } from "express"
import User from "../models/User"
import jwt from "jsonwebtoken"

const UserController = {
    getAll: async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await User.getAll()
            res.status(200).json(users)
        } catch (err) {
            next(err)
        }
    },

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body
            
            const user = await User.getByName(username)
            
            if (!user) {
                return res.status(403).send({ code: "USER_NOT_FOUND" })
            }
            
            if (user.password !== password) {
                return res.status(403).send({ code: "INVALID_PASSWORD" })
            }

            const payload = { id: user?.id }

            const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "24h" })

            res.cookie("token", token, {
                httpOnly: true
            })

            return res.status(200).send(token)
        } catch (err) {
            next(err)
        }
    },

    signUp: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.body
            const error = await User.verify(user)
            if (error) {
                return res.status(400).send({ code: error })
            }
            user.role = "user"
            const newUser = await User.signUp(user)
            res.status(200).json(newUser)
        } catch (err) {
            next(err)
        }
    }
}

export default UserController