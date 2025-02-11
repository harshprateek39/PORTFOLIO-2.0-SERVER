import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:[true,"Please enter email"]
         
    },
    password:{
        type:String,
        require :[ true ,"Enter Password"]
    }
    
});
export const UserModel = mongoose.model("admin", userSchema);