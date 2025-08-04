import TravelModel from "./TravelModel";
import createError from "../utils/createError";
import mongoose from "mongoose";

class Travel {
    id: string;
    title: string;
    description: string;
    destination: string;
    price: number;
    img_url: string;
    poi_ids: string[];
    departure_date: Date;
    arrival_date: Date;
    departure_city: string;
    arrival_city: string;
    type: string;

    constructor(travel: Travel) {
        this.id = travel.id
        this.title = travel.title
        this.description = travel.description
        this.destination = travel.destination
        this.price = travel.price
        this.img_url = travel.img_url
        this.poi_ids = travel.poi_ids
        this.departure_date = travel.departure_date
        this.arrival_date = travel.arrival_date
        this.departure_city = travel.departure_city
        this.arrival_city = travel.arrival_city
        this.type = travel.type
    }

    static verify(travel: Travel) {
        if (!travel.title) {return createError("Invalid title", 409, "INVALID_TITLE")}
        if (!travel.description) {return createError("Invalid description", 409, "INVALID_DESCRIPTION")}
        if (!travel.destination) {return createError("Invalid destination", 409, "INVALID_DESTINATION")}
        if (isNaN(travel.price)) {return createError("Invalid price", 409, "INVALID_PRICE")}
        if (!travel.img_url) {return createError("Invalid image URL", 409, "INVALID_URL")}
        if (!Array.isArray(travel.poi_ids)) {return createError("Invalid POI ID", 409, "INVALID_POI")}
        if (!travel.departure_date) {return createError("Invalid departure_date", 409, "INVALID_DEP_DATE")}
        if (!travel.arrival_date) {return createError("Invalid arrival_date", 409, "INVALID_ARR_DATE")}
        if (!travel.departure_city) {return createError("Invalid departure_city", 409, "INVALID_DEP_CITY")}
        if (!travel.arrival_city) {return createError("Invalid arrival_city", 409, "INVALID_ARR_CITY")}
        if (!travel.type) {return createError("Invalid type", 409, "INVALID_TYPE")}
    }

    static GetAll() {
        return TravelModel.find()
    }

    static getById(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null
        }
        return TravelModel.findById(id)
    }

    static getByDestination(dest: string) {
        return TravelModel.find({ destination: dest })
    }

    static create(travel: Travel) {
        return TravelModel.create(travel)
    }

    static update(id: string, travel: Travel) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null
        }
        return TravelModel.findByIdAndUpdate(id, travel, { new: true, runValidators: true })
    }

    static delete(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null
        }
        return TravelModel.findByIdAndDelete(id)
    }
}

export default Travel