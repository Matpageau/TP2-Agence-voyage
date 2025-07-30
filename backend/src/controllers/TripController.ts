import { NextFunction, Request, Response } from "express";
import Trip from "../models/Trip";
import createError from "../utils/createError";

const TripController = {
    async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const trips = await Trip.GetAll()
            if (trips.length === 0) {
                return next(createError("No trip found in database", 404, "TRIP_NOT_FOUND"))
            }
            res.status(200).json(trips)
        } catch (err) {
            next(err)
        }
    },

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const tripId = req.params.tripId
            const trip = Trip.getById(tripId)
            if (!trip) {
                return next(createError("Trip not found", 404, "TRIP_NOT_FOUND"))
            }
            res.status(200).json(trip)
        } catch (err) {
            next(err)
        }
    },

    async getByDestination(req: Request, res: Response, next: NextFunction) {
        try {
            const destination = req.params.destination
            const trips = await Trip.getByDestination(destination)
            if (trips.length === 0) {
                return next(createError("No trip with requested destination found", 404, "TRIP_NOT_FOUND"))
            }
            res.status(200).json(trips)
        } catch (err) {
            next(err)
        }
    },

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const tripId = req.params.tripId
            const data = req.body
            // TODO
            const trip = await Trip.update(tripId, data)
            res.status(200).json(trip)
        } catch (err) {
            next(err)
        }
    },

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const tripId = req.params.tripId
            const deletedTrip = await Trip.delete(tripId)
            if (!deletedTrip) {
                return next(createError("Trip not found", 404, "TRIP_NOT_FOUND"))
            }
            res.status(200).json(`Trip '${deletedTrip.destination}' deleted`)
        } catch (err) {
            next(err)
        }
    }
}

export default TripController