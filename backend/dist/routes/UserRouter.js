"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const UserRouter = express_1.default.Router();
UserRouter.get("/", UserController_1.default.getAll);
UserRouter.get("/me", UserController_1.default.getByToken);
UserRouter.get("/:userId", UserController_1.default.getById);
UserRouter.put("/:userId", UserController_1.default.update);
UserRouter.delete("/:userId", UserController_1.default.delete);
UserRouter.patch("/:userId", UserController_1.default.handleLike);
UserRouter.patch("/role/:userId", UserController_1.default.modifyRole);
UserRouter.patch("/cart/:userId", UserController_1.default.updateCart);
exports.default = UserRouter;
