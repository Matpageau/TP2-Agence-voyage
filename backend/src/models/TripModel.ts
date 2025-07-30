import mongoose from "mongoose";

const TripSchema = new mongoose.Schema({
    destination: {
        type: String,
        required: true
    }
})

const TripModel = mongoose.model("trip", TripSchema)

export default TripModel