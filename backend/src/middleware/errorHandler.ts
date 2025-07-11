import { Request, Response } from "express"

export default function errorHandler (err: any, _req: Request, res: Response) {
    return res.status(err.status || 500).send(err.code || "Internal error [500]")
}