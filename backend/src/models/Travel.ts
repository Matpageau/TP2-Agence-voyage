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
    poi: number;
    departure_date: string;
    arrival_date: string;
    type: string;

    constructor(travel: Travel) {
        this.id = travel.id
        this.title = travel.title
        this.description = travel.description
        this.destination = travel.destination
        this.price = travel.price
        this.img_url = travel.img_url
        this.poi = travel.poi
        this.departure_date = travel.departure_date
        this.arrival_date = travel.arrival_date
        this.type = travel.type
    }

    static verify(travel: Travel) {
        if (this.isValidString(travel.title)) {return createError("Invalid title", 409, "INVALID_TITLE")}
        if (this.isValidString(travel.description)) {return createError("Invalid description", 409, "INVALID_DESCRIPTION")}
        if (this.isValidString(travel.destination)) {return createError("Invalid destination", 409, "INVALID_DESTINATION")}
        if (this.isValidNumber(travel.price)) {return createError("Invalid price", 409, "INVALID_PRICE")}
        if (this.isValidString(travel.img_url)) {return createError("Invalid image URL", 409, "INVALID_URL")}
        if (this.isValidNumber(travel.poi)) {return createError("Invalid POI", 409, "INVALID_POI")}
        if (this.isValidString(travel.departure_date)) {return createError("Invalid departure date", 409, "INVALID_DEP_DATE")}
        if (this.isValidString(travel.arrival_date)) {return createError("Invalid arrival date", 409, "INVALID_ARR_DATE")}
        if (this.isValidString(travel.type)) {return createError("Invalid type", 409, "INVALID_TYPE")}
        return null
    }

    static isValidString(str: string) {
        return str.trim().length !== 0 || typeof str === 'string'
    }

    static isValidNumber(num: number) {
        return !isNaN(num) || num > 0 || typeof num === 'number'
    }

    static GetAll(skip: number, limit: number) {
        return TravelModel.find().skip(skip).limit(limit)
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