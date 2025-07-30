import TripModel from "./TripModel";
import createError from "../utils/createError";

class Trip {
    id: String;
    destination: String;

    constructor(trip: Trip) {
        this.id = trip.id || null
        this.destination = trip.destination
    }

    static GetAll() {
        return TripModel.find()
    }

    static getById(id: String) {
        return TripModel.findById(id)
    }

    static getByDestination(dest: String) {
        return TripModel.find({ destination: dest })
    }

    static update(id: String, trip: Trip) {
        return TripModel.findByIdAndUpdate(id, trip, { new: true, runValidators: true })
    }

    static delete(id: String) {
        return TripModel.findByIdAndDelete(id)
    }
}

export default Trip