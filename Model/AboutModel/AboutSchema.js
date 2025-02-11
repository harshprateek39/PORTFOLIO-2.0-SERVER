import mongoose from "mongoose";
import validator from "validator";
const AboutSchema = new mongoose.Schema({
    skills:[
        {type:String, unique:[true,"matching skills found"]}
    ],
    description:{
        type:String,
        require :[ true ,"Add You Intro"]
    }
    
} , {collection:"About"});
export const AboutModel = mongoose.model("About", AboutSchema);