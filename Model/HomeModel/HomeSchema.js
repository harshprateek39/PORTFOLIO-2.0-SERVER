import mongoose from "mongoose";
import validator from "validator";

const { Schema, model } = mongoose;

const HomeSchema = new Schema({
    image: {
        url: {
            type: String,
            required: [true, "Insert Image"]
        },
        public_id: {
            type: String,
            required: [true, "Insert Image"]
        }
    },
    description: {
        type: String,
        required: [true, "Add Your Intro"]
    }
},{collection:"Home"});

export const HomeModel = model("Home", HomeSchema);
