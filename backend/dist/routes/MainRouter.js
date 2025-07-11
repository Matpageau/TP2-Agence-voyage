"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRouter_1 = __importDefault(require("./UserRouter"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const MainRouter = express_1.default.Router();
MainRouter.use("/users", UserRouter_1.default);
MainRouter.post("/signup", UserController_1.default.signUp);
MainRouter.post("/login", UserController_1.default.login);
exports.default = MainRouter;
