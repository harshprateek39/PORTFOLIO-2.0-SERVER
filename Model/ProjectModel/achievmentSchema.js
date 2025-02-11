import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const AchievementSchema = new Schema({
    title: { type: String, required: [true, "Add title"] },
    heading: { type: String, required: [true, "Add heading"] },
    image: {
        url: {
            type: String,
            default:null,          
        },
        public_id: {
            type: String,
            default:null,     
        },   
    },
    description: {
        type: String,
        required: [true, "Add Your Intro"]
    },
    startDate:{
        type: Date,
        required:[true,"Date Missing"]
    },
    endDate:{
        type: Date,
        default:null    
    }
}, { collection: "Achievement" });

export const AchievementModel = model("Achievement", AchievementSchema);
