import asyncHandler from "express-async-handler"

import validator from "validator";
import bcrypt from  'bcrypt';
import session from "express-session";
import cloudinary from "../../Utility/cloudinary.js";
import { AboutModel } from "../../Model/AboutModel/AboutSchema.js";
export const EditAboutDescription = asyncHandler(async(req,res)=>{
    const {description}= req.body;
      if(!description) {
        return res.status(404).json({message:"Add Description",success:false});
      }
   try{
      if(description){
     const result= await AboutModel.findOne({});
     const updatedData= await AboutModel.findByIdAndUpdate(result._id, {description:description});
     return res.status(200).json({data:updatedData,success:true});

      }
     
   }
   catch (error) {
    res.status(500).json({
        success: false,
        message: error.message,
    }); 
   }
});
export const EditAboutSkills = asyncHandler(async(req,res)=>{
    const {skills}= req.body;
      if(!skills) {
        
        return res.status(404).json({message:"Skill Missing",success:false});
      }
   try{
      if(skills){
     const result= await AboutModel.findOne({});
     const updatedData= await AboutModel.findByIdAndUpdate(result._id, {skills:skills},{new:true});
     return res.status(200).json({data:updatedData.skills,success:true,message:"Skills updated successfully"});

      }
     
   }
   catch (error) {
    res.status(500).json({
        success: false,
        message: error.message,
    });
   }
});
 export const getAbout = asyncHandler(async(req,res)=>{
    
   try{
    const data= await AboutModel.findOne({})
     if(!data){
        return res.status(404).json({ success:false, message:"Internal Error"});
     }
     return res.status(200).json({success:true,data:data,message:"Data fetched succesfully"});
   }
   catch (error) {
    res.status(500).json({
        success: false,
        message: error.message,
    });
   }
});