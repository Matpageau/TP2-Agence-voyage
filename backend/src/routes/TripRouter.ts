import express from "express";
import TripController from "../controllers/TripController";

const TripRouter = express.Router()

TripRouter.get("/", TripController.getAll)
TripRouter.get("/:tripId", TripController.getById)
TripRouter.put("/:tripId", TripController.update)
TripRouter.delete("/:tripId", TripController.delete)