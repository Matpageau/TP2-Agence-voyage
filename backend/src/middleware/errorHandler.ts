import { NextFunction, Request, Response } from "express"
import { ErrorData } from "../types/Error"

export default function errorHandler (err: ErrorData, _req: Request, res: Response, _next: NextFunction) {
    const { message, status, code } = err
    
    res.status(status!).json({ error: { message, status, code } })
}