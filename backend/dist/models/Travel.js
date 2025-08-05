"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TravelModel_1 = __importDefault(require("./TravelModel"));
const createError_1 = __importDefault(require("../utils/createError"));
const mongoose_1 = __importDefault(require("mongoose"));
class Travel {
    constructor(travel) {
        this.id = travel.id;
        this.title = travel.title;
        this.description = travel.description;
        this.destination = travel.destination;
        this.price = travel.price;
        this.img_url = travel.img_url;
        this.poi_ids = travel.poi_ids;
        this.departure_date = travel.departure_date;
        this.arrival_date = travel.arrival_date;
        this.departure_city = travel.departure_city;
        this.arrival_city = travel.arrival_city;
        this.type = travel.type;
    }
    static verify(travel) {
        if (!travel.title) {
            return (0, createError_1.default)("Invalid title", 409, "INVALID_TITLE");
        }
        if (!travel.description) {
            return (0, createError_1.default)("Invalid description", 409, "INVALID_DESCRIPTION");
        }
        if (!travel.destination) {
            return (0, createError_1.default)("Invalid destination", 409, "INVALID_DESTINATION");
        }
        if (isNaN(travel.price)) {
            return (0, createError_1.default)("Invalid price", 409, "INVALID_PRICE");
        }
        if (!travel.img_url) {
            return (0, createError_1.default)("Invalid image URL", 409, "INVALID_URL");
        }
        if (!Array.isArray(travel.poi_ids)) {
            return (0, createError_1.default)("Invalid POI ID", 409, "INVALID_POI");
        }
        if (!travel.departure_date) {
            return (0, createError_1.default)("Invalid departure_date", 409, "INVALID_DEP_DATE");
        }
        if (!travel.arrival_date) {
            return (0, createError_1.default)("Invalid arrival_date", 409, "INVALID_ARR_DATE");
        }
        if (!travel.departure_city) {
            return (0, createError_1.default)("Invalid departure_city", 409, "INVALID_DEP_CITY");
        }
        if (!travel.arrival_city) {
            return (0, createError_1.default)("Invalid arrival_city", 409, "INVALID_ARR_CITY");
        }
        if (!travel.type) {
            return (0, createError_1.default)("Invalid type", 409, "INVALID_TYPE");
        }
    }
    static GetAll() {
        return TravelModel_1.default.find();
    }
    static getById(id) {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return null;
        }
        return TravelModel_1.default.findById(id);
    }
    static getByDestination(dest) {
        return TravelModel_1.default.find({ destination: dest });
    }
    static create(travel) {
        return TravelModel_1.default.create(travel);
    }
    static update(id, travel) {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return null;
        }
        return TravelModel_1.default.findByIdAndUpdate(id, travel, { new: true, runValidators: true });
    }
    static delete(id) {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return null;
        }
        return TravelModel_1.default.findByIdAndDelete(id);
    }
}
exports.default = Travel;
