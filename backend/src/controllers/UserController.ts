import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import createError from "../utils/createError";
import Travel from "../models/Travel";

const UserController = {
    async getAll (req: Request, res: Response, next: NextFunction) {
        try {
            const limit = Number(req.query.limit)
            if (limit && isNaN(limit)) {
                return next(createError("Invalid limit requested", 400, "INVALID_LIMIT"))
            }
            const users = await User.getAll(limit)
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
            const userId = req.params.userId
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

    async getByToken (req: Request, res: Response, next: NextFunction) {
        try {            
            const token = req.cookies.token
            if (!token) {
                return next(createError("User not found", 404, "USER_NOT_FOUND"))
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
            const user = await User.getById(decoded.id)
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
            const userId = req.params.userId
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
    },

    async handleLike(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId
            const { action, travelId } = req.body
            let actionMessage = ""
            switch (action) {
                case 'like':
                    await like(userId, travelId)
                    actionMessage = "added to"
                    break;
                case 'dislike':
                    await dislike(userId, travelId)
                    actionMessage = "deleted from"
                    break;
                default:
                    return next(createError("Invalid requested action", 400, "INVALID_ACTION"))
            }
            res.status(200).json(`Travel ${actionMessage} 'Liked'`)
        } catch (err) {
            next(err)
        }
    }
}

async function like(userId: string, travelId: string) {
    const [user, travel] = await Promise.all([
        User.getById(userId),
        Travel.getById(travelId)
    ])
    const [user, travel] = await Promise.all([
        User.getById(userId),
        Travel.getById(travelId)
    ])
    if (!user) {
        throw createError("User not found", 404, "USER_NOT_FOUND")
    }
    if (!travel) {
        throw createError("Travel not found", 404, "TRAVEL_NOT_FOUND")
    }
    
    if(!user.liked.includes(travelId)) {
      user.liked.push(travelId)
      await user.save()
    }
}

async function dislike(userId: string, travelId: string) {
    const user = await User.getById(userId)
    if (!user) {
        throw createError("User not found", 404, "USER_NOT_FOUND")
    }
    const index = user.liked.indexOf(travelId)
    if (index !== -1) {
        user.liked.splice(index, 1)
        await user.save()
    }
}

export default UserController