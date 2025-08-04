"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TripController_1 = __importDefault(require("../controllers/TripController"));
const TripRouter = express_1.default.Router();
TripRouter.get("/", TripController_1.default.getAll);
TripRouter.get("/:tripId", TripController_1.default.getById);
TripRouter.put("/:tripId", TripController_1.default.update);
TripRouter.delete("/:tripId", TripController_1.default.delete);
