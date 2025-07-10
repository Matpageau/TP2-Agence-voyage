import { Request, Response } from "express"

export default function errorHandler (err: any, _req: Request, res: Response) {
    console.log("aijewfioaehsgiouegouesfgiojk")
    return res.status(500).send("Internal error [500]")
}