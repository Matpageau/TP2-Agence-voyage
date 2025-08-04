"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Trip_1 = __importDefault(require("../models/Trip"));
const createError_1 = __importDefault(require("../utils/createError"));
const TripController = {
    async getAll(_req, res, next) {
        try {
            const trips = await Trip_1.default.GetAll();
            if (trips.length === 0) {
                return next((0, createError_1.default)("No trip found in database", 404, "TRIP_NOT_FOUND"));
            }
            res.status(200).json(trips);
        }
        catch (err) {
            next(err);
        }
    },
    async getById(req, res, next) {
        try {
            const tripId = req.params.tripId;
            const trip = Trip_1.default.getById(tripId);
            if (!trip) {
                return next((0, createError_1.default)("Trip not found", 404, "TRIP_NOT_FOUND"));
            }
            res.status(200).json(trip);
        }
        catch (err) {
            next(err);
        }
    },
    async getByDestination(req, res, next) {
        try {
            const destination = req.params.destination;
            const trips = await Trip_1.default.getByDestination(destination);
            if (trips.length === 0) {
                return next((0, createError_1.default)("No trip with requested destination found", 404, "TRIP_NOT_FOUND"));
            }
            res.status(200).json(trips);
        }
        catch (err) {
            next(err);
        }
    },
    async update(req, res, next) {
        try {
            const tripId = req.params.tripId;
            const data = req.body;
            // TODO
            const trip = await Trip_1.default.update(tripId, data);
            res.status(200).json(trip);
        }
        catch (err) {
            next(err);
        }
    },
    async delete(req, res, next) {
        try {
            const tripId = req.params.tripId;
            const deletedTrip = await Trip_1.default.delete(tripId);
            if (!deletedTrip) {
                return next((0, createError_1.default)("Trip not found", 404, "TRIP_NOT_FOUND"));
            }
            res.status(200).json(`Trip '${deletedTrip.destination}' deleted`);
        }
        catch (err) {
            next(err);
        }
    }
};
exports.default = TripController;
