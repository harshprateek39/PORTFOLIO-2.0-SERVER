import asyncHandler from "express-async-handler"
import { HomeModel } from "../../Model/HomeModel/HomeSchema.js";

import {updateImageOnCloudinary } from '../../Utility/updateImage.js'

 export const EditHomeImage = asyncHandler(async(req,res)=>{
    const {image}= req.body;
     if(!image){ 
        return res.status(404).json({message:"Image not found"});
     }
   try{  
     const data= await HomeModel.findOne({})
     if(!data){
        return res.status(404).json({message:"Internal Error"});
     }
     const img = await updateImageOnCloudinary(data.image.public_id, image);
     
      const  result = await HomeModel.findByIdAndUpdate(data._id,{image:img.data},{ new: true })
     // Handle the result if needed
     return res.status(200).json({   
      success: true, 
      message: "Profile Image Update Successfully",
      data:result.image.url
  });
   
   }
   catch (error) {
    res.status(500).json({    
        success: false, 
        message: error.message,
        data:null
    }); 
   }  
}); 

export const EditHomeDescription= asyncHandler(async(req,res)=>{
   const {description} = req.body;
   try {
      if (!description){ return res.status(404).json({success:false, message:"Please Enter Description",data:null}); }
      const data= await HomeModel.findOne({});
      if(!data){
         return res.status(404).json({success:false, message:"error while editing Home description ",data:null});
      }
      const result = await HomeModel.findByIdAndUpdate(data._id,{description:description}, {new:true});
      return res.status(200).json({success:true, message:"Updated Home Description",data:result.description});
      
   } catch (error) {
      return res.status(404).json({success:false, message:error.message,data:null});
   }

  

});
export const getHomeData= asyncHandler(async(req,res)=>{
   
   try {
      const data= await HomeModel.findOne({});
      if(!data){
         return res.status(404).json({success:false, message:"error while editing Home description ",data:null});
      }
      
      return res.status(200).json({success:true, message:"Home details fetched succesfully",data:data});
      
   } catch (error) {
      return res.status(404).json({success:false, message:error.message,data:null});
   }

  

})

