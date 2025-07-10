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
                res.status(403).send("INVALID_USERNAME")
                /* const error = {message: "INVALID_USERNAME", status: 403}
                throw error */
            }

            if (user?.password !== password) {
                res.status(403).send("INVALID_PASSWORD")
                /* const error = {message: "INVALID_PASSWORD", status: 403}
                throw error */
            }

            const payload = { id: user?.id }

            const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "24h" })

            res.cookie("token", token, {
                httpOnly: true
            })

            res.status(200).send(token)
        } catch (err) {
            next(err)
        }
    },

    signUp: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.body
            User.verify(user)
            user.role = "user"
            const newUser = await User.signUp(user)
            res.status(200).json(newUser)
        } catch (err) {
            next(err)
        }
    }
}

export default UserController