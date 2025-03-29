import mongoose from "mongoose";
import User from "./user.model.js";


const vehicleSchema = new mongoose.Schema({
    isAvailable:{
        type: Boolean,

    },
    licenceNumber:{
        type: String,
    },
    vehicleNumber: {
        type: String,
        required: true,
        index: true,
    },
    vehicleType: {
        type: String,
        enum: ["Bike", "Auto", "Car"],
        required: true,
    },
    vehicleCapacity: {
        type: Number,
        required: true,
    },
    vehicleImageUrl: {
        type: String,
        required: false,
    },
});

const Captain=User.discriminator("Captain",vehicleSchema);

 
export default Captain;