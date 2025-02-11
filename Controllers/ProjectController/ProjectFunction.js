import asyncHandler from "express-async-handler"
import { AchievementModel } from "../../Model/ProjectModel/achievmentSchema.js";
import { createImageOnCloudinary } from "../../Utility/createImage.js";
import { deleteImageOnCloudinary } from "../../Utility/deleteImage.js";
import { compareDateStrings, isValidDateString } from "../../Utility/dateValidator.js";
import { ProjectModel} from "../../Model/ProjectModel/projectSchema.js";
export const createProject= asyncHandler(async(req,res)=>{
    const {title, heading,description , startDate, image,liveLink,githubLink,technologies}=req.body;
     var error=[];
     if(!title) { error.push("Title")};
     if(!heading) {error.push("Heading")};
     if(!description) {error.push("Description")};
     if(!startDate) {error.push("Start date")};
     if(!technologies) {error.push("Technologies")};
     if(!image) {error.push("Image")};
      if( error.length > 0 ){
       return  res.status(501).json({success: false, message:  error.join(", ") + " are required fields",data:null});
      }
      if(technologies&&technologies.length>10){
        return  res.status(501).json({success: false, message: "Reduce Tech Stack",data:null});
      }
      for(var i=0; i<technologies.length; i++){
         if(technologies[i].length>10){
            return  res.status(501).json({success: false, message: "Individual tech length is too long",data:null});
         }
      }
      if(!isValidDateString(startDate) ){
        return  res.status(501).json({success: false, message: "Invalid date format",data:null});
     }
     const currentDate = new Date();
     if(!compareDateStrings(currentDate, startDate)){
        return  res.status(501).json({success: false, message: "Date can't cross the current date",data:null});
     }
      try {   
     const techSet= [...new Set(technologies)];
         const img=  await createImageOnCloudinary(image);
          if(!img.success){
         return res.status(500).json({success: false, message: "Error in your image file",data:null});     
      }
       
            const result=   new ProjectModel({title:title,
                heading:heading,
                image:img.data,
                description:description,
                startDate:startDate, 
                liveLink:liveLink,
                githubLink:githubLink,
                technologies:techSet
                });
                await result.save();
               return  res.status(200).json({success:true, message:"Project added successfully",data:result});
     
 
        } catch (error) {
            res.status(400).json({success:false, message:error.message,data:null});
        }
});

export const deleteProject = asyncHandler(async (req, res) => {
 
    const {_id, public_id}=req.body;
    
    if (!_id) {
        return res.status(400).json({ success: false, message: "Bad Request: _id is required", data: null });
    }
    if (!public_id) {
        return res.status(400).json({ success: false, message: "Missing Public ID", data: null });
    }
    try {
       
            const imgDeleteResult = await deleteImageOnCloudinary(public_id);
            if (!imgDeleteResult.success) {
                return res.status(400).json({ success: false, message: "Error while deleting image", data: null });
            }
        
        const result = await ProjectModel.findByIdAndDelete(_id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Project not found", data: null });
        }
        return res.status(200).json({ success: true, message: "Project deleted successfully", data: result });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
});


export const editProject = asyncHandler(async(req, res) => {
    const {title, heading,description , startDate, image,liveLink,githubLink,technologies ,_id, public_id}=req.body;
    var error=[];
    if (!_id) {
        return res.status(400).json({ success: false, message: "Bad Request: _id is required", data: null });
    }
   
    if(!title) { error.push("title")};
    if(!heading) {error.push("heading")};
    if(!description) {error.push("description")};
    if(!startDate) {error.push("date")};
    if(!technologies) {error.push("technologies")};
    
   
    if (error.length > 0) {
        return res.status(400).json({ success: false, message:  error.join(", ") + " are required fields", data: null });
    }
    
     if(technologies&&technologies.length>10){
       return  res.status(501).json({success: false, message: "Reduce Tech Stack",data:null});
     }
     for(var i=0; i<technologies.length; i++){
        if(technologies[i].length>10){
           return  res.status(501).json({success: false, message: "Individual tech length is too long",data:null});
        }
     }
     if(!isValidDateString(startDate) ){
       return  res.status(501).json({success: false, message: "Invalid date format",data:null});
    }
    const currentDate = new Date();
    if(!compareDateStrings(currentDate, startDate)){
       return  res.status(501).json({success: false, message: "Date can't cross the current date",data:null});
    }

    try {
        const techSet= [...new Set(technologies)];
     
        let updatedFields = {
            title,
            heading,
            description,
            startDate,
            liveLink,
            githubLink,
            technologies: techSet
        };
        if (image) {
            if (!public_id) {
                return res.status(400).json({success: false, message: "Missing Public ID", data: null});
            }

            // Delete old image
            const deleteImageResult = await deleteImageOnCloudinary(public_id);
            if (!deleteImageResult.success) {
                return res.status(500).json({success: false, message: "Error while deleting image", data: null});
            }

            // Upload new image
            const img = await createImageOnCloudinary(image);
            if (!img.success) {
                return res.status(500).json({success: false, message: "Error in image file", data: null});
            }

            // Update image in updatedFields
            updatedFields.image = img.data;
        }
          
        const result = await ProjectModel.findByIdAndUpdate(_id, updatedFields, {new: true});
        if (!result) {
            return res.status(404).json({success: false, message: "Project not found", data: null});
        }
        // Return success response
        return res.status(200).json({success: true, message: "Project edited successfully", data: result});
        
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
});


export const getProjects = asyncHandler(async(req, res) => {
    try {
        const projects = await ProjectModel.find({});
        if (!projects) {
            return res.status(404).json({ success: false, message: "No Project found", data: null });
        }
        return res.status(200).json({ success: true, message: "Projects found", data: projects });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
});
