import { NextFunction, Request, Response } from "express"

interface CustomError extends Error {
    status?: number
    code?: string
}

export default function errorHandler (err: CustomError, _req: Request, res: Response, _next: NextFunction) {
    const status = err.status || 500
    const code = err.code || "INTERNAL_SERVER_ERROR"

    res.status(status).json({
        error: {
            message: err.message,
            code: code,
            status: status
        }
    })
}