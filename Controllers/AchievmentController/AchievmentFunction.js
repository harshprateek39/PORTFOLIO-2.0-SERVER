import asyncHandler from "express-async-handler"
import { AchievementModel } from "../../Model/ProjectModel/achievmentSchema.js";
import { createImageOnCloudinary } from "../../Utility/createImage.js";
import { deleteImageOnCloudinary } from "../../Utility/deleteImage.js";
import {  compareDateStrings, isValidDateString } from "../../Utility/dateValidator.js"
export const createAchievment= asyncHandler(async(req,res)=>{
    const {title, heading,description , startDate,endDate, image}=req.body;
     var error=[];
     if(!title) { error.push("title must be provided")};
     if(!heading) {error.push("Add a heading")};
     if(!description) {error.push("Add a description")};
     if(!startDate) {error.push("Add a start date")};
  
      if( error.length > 0 ){
       return  res.status(501).json({success: false, message: "title,heading,description and start date must be provided",data:null});
      }
     if(!isValidDateString(startDate) ){
        return  res.status(501).json({success: false, message: "Invalid date format",data:null});
     }
     if(endDate){
        if(!isValidDateString(endDate) ){
            return  res.status(501).json({success: false, message: "Invalid date format",data:null});
         }
         if(!compareDateStrings(endDate,startDate)){
            return  res.status(501).json({success: false, message: "Invalid date order",data:null});
         }
     }
       
      try {
     
      if(image){
         const img=  await createImageOnCloudinary(image);
          if(!img.success){
         return res.status(500).json({success: false, message: "Error in your image file",data:null});     
      }
            const result=   new AchievementModel({title:title,
                heading:heading,
                image:img.data,
                description:description,
                startDate:startDate, 
                endDate:endDate});
                await result.save();
               return  res.status(200).json({success:true, message:"Achievment added successfully",data:result});}
       else{
        const result=new AchievementModel({title:title,
            heading:heading,
            image:image,
            description:description,
            startDate:startDate, 
            endDate:endDate});
            await result.save();
           return  res.status(200).json({success:true, message:"Achievment added successfully",data:result});
       }

        } catch (error) {
            res.status(400).json({success:false, message:error.message,data:null});
        }
});

export const deleteAchievment = asyncHandler(async (req, res) => {
    const { _id, public_id } = req.body;
    if (!_id) {
        return res.status(400).json({ success: false, message: "Bad Request: _id is required", data: null });
    }

    try {
        if (public_id) {
            const imgDeleteResult = await deleteImageOnCloudinary(public_id);
            if (!imgDeleteResult.success) {
                return res.status(400).json({ success: false, message: "Error while deleting image", data: null });
            }
        }
        const result = await AchievementModel.findByIdAndDelete(_id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Achievement not found", data: null });
        }
        return res.status(200).json({ success: true, message: "Achievement deleted successfully", data: result });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
});


export const editAchievment = asyncHandler(async(req, res) => {
    const { title, heading, description, startDate, endDate, image, public_id, _id } = req.body;
    const errors = [];
    
    if (!_id) {
        return res.status(400).json({ success: false, message: "ID is required", data: null });
    }

    if (!title) errors.push("Title must be provided");
    if (!heading) errors.push("Heading must be provided");
    if (!description) errors.push("Description must be provided");
    if (!startDate) errors.push("Start date must be provided");

    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: "Validation errors", errors });
    }
    if(!isValidDateString(startDate) ){
        return  res.status(501).json({success: false, message: "Invalid date format",data:null});
     }
     if(endDate){
        if(!isValidDateString(endDate) ){
            return  res.status(501).json({success: false, message: "Invalid date format",data:null});
         }
         if(!compareDateStrings(endDate,startDate)){
            return  res.status(501).json({success: false, message: "Invalid date order",data:null});
         }
     } 

    try {
        let result;
        if (image) {
            if (!public_id) {
                return res.status(400).json({ success: false, message: "Image PID is missing", data: null });
            }
            const deleteImageResult = await deleteImageOnCloudinary(public_id);
            if (!deleteImageResult.success) {
                return res.status(400).json({ success: false, message: "Error while deleting image", data: null });
            }
            const img = await createImageOnCloudinary(image);
            if (!img.success) {
                return res.status(500).json({ success: false, message: "Error in image file", data: null });
            }
            result = await AchievementModel.findByIdAndUpdate(_id, {
                title,
                heading,
                description,
                startDate,
                endDate,
                image: img.data
            }, { new: true });
        } else {
            result = await AchievementModel.findByIdAndUpdate(_id, {
                title,
                heading,
                description,
                startDate,
                endDate
            }, { new: true });
        }
        if (!result) {
            return res.status(404).json({ success: false, message: "Achievement not found", data: null });
        }
        return res.status(200).json({ success: true, message: "Achievement edited successfully", data: result });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
});


export const getAchievements = asyncHandler(async(req, res) => {
    try {
        const achievements = await AchievementModel.find({});
        if (!achievements) {
            return res.status(404).json({ success: false, message: "No achievements found", data: null });
        }
        return res.status(200).json({ success: true, message: "Achievements found", data: achievements });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
});
