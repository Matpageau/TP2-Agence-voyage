import mongoose from "mongoose";

const TravelSchema = new mongoose.Schema({
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
    poi_ids: {
        type: [String],
        required: true
    },
    departure_date: {
        type: Date,
        required: true
    },
    arrival_date: {
        type: Date,
        required: true
    },
    departure_city: {
        type: String,
        required: true
    },
    arrival_city: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

const TravelModel = mongoose.model("travel", TravelSchema)

export default TravelModel