import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import createError from "../utils/createError";

const UserController = {
    async getAll (_req: Request, res: Response, next: NextFunction) {
        try {
            const users = await User.getAll()
            if (users.length === 0) {
                return next(createError("No user found in database", 404, "USER_NOT_FOUND"))
            }
            res.status(200).json(users)
        } catch (err) {
            next(err)
        }
    },

    async getById (req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id
            const user = await User.getById(userId)
            if (!user) {
                return next(createError("User not found", 404, "USER_NOT_FOUND"))
            }
            res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    },

    async getByName (req: Request, res: Response, next: NextFunction) {
        try {
            const username = req.body.username
            const user = await User.getByName(username)
            if (!user) {
                return next(createError("User not found", 404, "USER_NOT_FOUND"))
            }
            res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    },

    async login (req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body
            const user = await User.getByName(username)
            
            if (!user) {
                return next(createError("User not found", 404, "USER_NOT_FOUND"))
            }
            
            if (user.password !== password) {
                return next(createError("Invalid password", 401, "INVALID_PASSWORD"))
            }

            const payload = { id: user.id }
            const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "24h" })
            res.cookie("token", token, {
                httpOnly: true
            })
            return res.status(200).send(token)
        } catch (err) {
            next(err)
        }
    },

    async signUp (req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body
            const err = await User.verify(data)
            if (err) {
                return next(err)
            }
            data.role ||= "user"
            const user = await User.signUp(data)
            res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    },

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id
            const data = req.body
            const err = await User.verify(data)
            if (err) {
                return next(err)
            }
            const user = await User.update(userId, data)
            if (!user) {
                return next(createError("User not found", 404, "USER_NOT_FOUND"))
            }
            res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    },

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId
            const user = await User.delete(userId)
            if (!user) {
                return next(createError("User not found", 404, "USER_NOT_FOUND"))
            }
            res.status(200).json(`User ${user.username} deleted`)
        } catch (err) {
            next(err)
        }
    }
}

export default UserController