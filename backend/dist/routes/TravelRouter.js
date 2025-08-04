"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TravelController_1 = __importDefault(require("../controllers/TravelController"));
const TravelRouter = express_1.default.Router();
TravelRouter.get("/", TravelController_1.default.getAll);
TravelRouter.get("/:travelId", TravelController_1.default.getById);
TravelRouter.post("/", TravelController_1.default.create);
TravelRouter.put("/:travelId", TravelController_1.default.update);
TravelRouter.delete("/:travelId", TravelController_1.default.delete);
exports.default = TravelRouter;
