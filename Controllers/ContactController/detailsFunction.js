import asyncHandler from "express-async-handler";
import { DetailModel } from "../../Model/ContactModel/detailsSchema.js";
import validator from "validator";
export const createDetail = asyncHandler(async(req,res)=>{
     const {email,github,linkedin,phoneNumber,resumeLink,twitter,instagram,whatsapp}=req.body;

     const errors = [];
     if (!email) errors.push("Email");
     if (!phoneNumber) errors.push("Phone Number");
     if (errors.length > 0) {
         return res.status(400).json({ message: `${errors.join(", ")} are required fields`, success: false });
     }
     // Validate email format
     if (!validator.isEmail(email)) {
         return res.status(400).json({ message: "Invalid email format", success: false });
     }
 
     // Create contact detail object
     const contactDetail = {
         email,
         github,
         linkedin,
         phoneNumber,
         resumeLink,
         twitter,
         instagram,
         whatsapp
     };
     try {
        const result= await DetailModel.create(contactDetail);
        await result.save();
        if(!result){
            return res.status(500).json({message:"Error creating contact",success:false});
        }
        return res.status(200).json({message:"Created contact",success:true,data:result});

     } catch (error) {
          return res.status(500).json({message:error.message,success:false});
     }
});
export const editDetail = asyncHandler(async(req,res)=>{
    const  {
        id,
        email,
        github,
        linkedin,
        phoneNumber,
        resumeLink,
        twitter,
        instagram,
        whatsapp
    } = req.body
     try {

        if(email){
            if(!validator.isEmail(email)){
                return res.status(400).json({message:"Invalid Email",success:false});
              }
        }

        if(phoneNumber){
            if(!validator.isMobilePhone(phoneNumber) ){
                return res.status(400).json({message:"Invalid Phone number",success:false});
            }
        }
        if(whatsapp){
            if(!validator.isMobilePhone(whatsapp) ){
                return res.status(400).json({message:"Invalid Whatsapp number number",success:false});
            }
        }
        if(github){
            if(!validator.isURL(github)){
                return res.status(400).json({message:"Invalid github Link",success:false});
            }
        }
        if(linkedin){
            if(!validator.isURL(github)){
                return res.status(400).json({message:"Invalid linkedin Link",success:false});
            }
        }
        if(twitter){
            if(!validator.isURL(twitter)){
                return res.status(400).json({message:"Invalid twitter Link",success:false});
            }
        }
        if(instagram){
            if(!validator.isURL(instagram)){
                return res.status(400).json({message:"Invalid instagram Link",success:false});
            }
        }
        if(resumeLink){
            if(!validator.isURL(resumeLink)){
                return res.status(400).json({message:"Invalid Resume Link",success:false});
            }
        }

        const result = await DetailModel.findByIdAndUpdate(id,{email,
            github,
            linkedin,
            phoneNumber,
            resumeLink,
            twitter,
            instagram, 
            whatsapp},{new:true});
          if(!result){  return res.status(500).json({message:"Error creating contact",success:false});}
          return res.status(200).json({message:"Updated",success:true,data:result});
     } catch (error) {
        return res.status(400).json({message:error.message,success:false})
     }
});