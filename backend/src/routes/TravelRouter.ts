import express from "express";
import TravelController from "../controllers/TravelController";

const TravelRouter = express.Router()

TravelRouter.get("/", TravelController.getAll)
TravelRouter.get("/:travelId", TravelController.getById)
TravelRouter.post("/", TravelController.create)
TravelRouter.put("/:travelId", TravelController.update)
TravelRouter.delete("/:travelId", TravelController.delete)

export default TravelRouter