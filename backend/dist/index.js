"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const MainRouter_1 = __importDefault(require("./routes/MainRouter"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const uri = "mongodb+srv://dev:dev@cluster0.ylc53cj.mongodb.net/voyage?retryWrites=true&w=majority&appName=Cluster0";
mongoose_1.default.connect(uri)
    .then(() => console.log("Connected to database"))
    .catch((err) => {
    console.error("Database connection error:", err);
});
app.use("/", MainRouter_1.default);
app.use(errorHandler_1.default);
app.listen(port);
