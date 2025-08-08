"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TravelSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img_url: {
        type: String,
        required: true
    },
    poi: {
        type: Number,
        required: true
    },
    departure_date: {
        type: String,
        required: true
    },
    arrival_date: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});
const TravelModel = mongoose_1.default.model("travel", TravelSchema);
exports.default = TravelModel;
