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
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
const uri = process.env.CONNECTION_STRING;
mongoose_1.default.connect(uri)
    .then(() => console.log("Connected to database"))
    .catch((err) => {
    console.error("Database connection error:", err);
});
app.use("/", MainRouter_1.default);
app.use(errorHandler_1.default);
app.listen(port);
