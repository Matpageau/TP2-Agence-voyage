"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Travel_1 = __importDefault(require("../models/Travel"));
const createError_1 = __importDefault(require("../utils/createError"));
const TravelController = {
    async getAll(req, res, next) {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit);
            if ((isNaN(page) || page < 1)) {
                return next((0, createError_1.default)("Invalid page requested", 400, "INVALID_PAGE"));
            }
            let travels = [];
            let travelCount;
            if (limit) {
                const skip = (page - 1) * limit;
                travelCount = await Travel_1.default.count();
                travels = await Travel_1.default.getWithLimit(skip, limit);
            }
            else {
                travels = await Travel_1.default.getAll();
                travelCount = 0;
            }
            if (travels.length === 0) {
                return next((0, createError_1.default)("No travel found in database", 404, "TRAVEL_NOT_FOUND"));
            }
            res.status(200).json({
                travels,
                travelCount
            });
        }
        catch (err) {
            next(err);
        }
    },
    async getById(req, res, next) {
        try {
            const travelId = req.params.travelId;
            const travel = await Travel_1.default.getById(travelId);
            if (!travel) {
                return next((0, createError_1.default)("Travel not found", 404, "TRAVEL_NOT_FOUND"));
            }
            res.status(200).json(travel);
        }
        catch (err) {
            next(err);
        }
    },
    async getByDestination(req, res, next) {
        try {
            const destination = req.params.destination;
            const travels = await Travel_1.default.getByDestination(destination);
            if (travels.length === 0) {
                return next((0, createError_1.default)("No travel with requested destination found", 404, "TRAVEL_NOT_FOUND"));
            }
            res.status(200).json(travels);
        }
        catch (err) {
            next(err);
        }
    },
    async create(req, res, next) {
        try {
            const data = req.body;
            const err = await Travel_1.default.verify(data);
            if (err) {
                return next(err);
            }
            const travel = await Travel_1.default.create(data);
            res.status(200).json(travel);
        }
        catch (err) {
            next(err);
        }
    },
    async update(req, res, next) {
        try {
            const travelId = req.params.travelId;
            const data = req.body;
            const err = Travel_1.default.verify(data);
            if (err) {
                return next(err);
            }
            const travel = await Travel_1.default.update(travelId, data);
            if (!travel) {
                return next((0, createError_1.default)("Travel not found", 404, "TRAVEL_NOT_FOUND"));
            }
            res.status(200).json(travel);
        }
        catch (err) {
            next(err);
        }
    },
    async delete(req, res, next) {
        try {
            const travelId = req.params.travelId;
            const deletedtravel = await Travel_1.default.delete(travelId);
            if (!deletedtravel) {
                return next((0, createError_1.default)("Travel not found", 404, "TRAVEL_NOT_FOUND"));
            }
            res.status(200).json(`Travel '${deletedtravel.title}' deleted`);
        }
        catch (err) {
            next(err);
        }
    }
};
exports.default = TravelController;
