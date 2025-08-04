"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TripModel_1 = __importDefault(require("./TripModel"));
class Trip {
    constructor(trip) {
        this.id = trip.id || null;
        this.destination = trip.destination;
    }
    static GetAll() {
        return TripModel_1.default.find();
    }
    static getById(id) {
        return TripModel_1.default.findById(id);
    }
    static getByDestination(dest) {
        return TripModel_1.default.find({ destination: dest });
    }
    static update(id, trip) {
        return TripModel_1.default.findByIdAndUpdate(id, trip, { new: true, runValidators: true });
    }
    static delete(id) {
        return TripModel_1.default.findByIdAndDelete(id);
    }
}
exports.default = Trip;
