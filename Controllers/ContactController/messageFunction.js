import asyncHandler from "express-async-handler"
import validator from "validator";
import { MessageModel } from "../../Model/ContactModel/messagesSchema.js";

export const createMessage = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;
    const errors = [];

    if (!name) {
        errors.push("name");
    }
    if (!email) {
        errors.push("email");
    }
    if (!message) {
        errors.push("message");
    }
    if (errors.length > 0) {
        return res.status(400).json({ message: `${errors.join(", ")} are required fields`, success: false });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email", success: false });
    }

    if (message.length < 10 || message.length > 3000) {
        return res.status(400).json({ message: "Invalid message length", success: false });
    }
 try {
    const result = await MessageModel.create({ name, email, message });
    if (!result) {
        return res.status(500).json({ message: "Error while sharing", success: false });
    }

    return res.status(200).json({ message: "Your details have been shared", success: true,data:result });
 } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
 }
   
});

export const deleteMessage = asyncHandler(async(req,res)=>{
  const id= req.params.id;
  if(!id) {return res.status(400).json({ message: "ID required", success: false });}
  try {
    const result= await MessageModel.findByIdAndDelete(id);
  if(!result) {return res.status(400).json({ message: "error while deleting", success: false });}
  return  res.status(200).json({ message: "Message Deleted", success: true  ,data:result});
    
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
  
});
export const getMessage=asyncHandler(async(req,res)=>{
    try {
        const result = await  MessageModel.find({});
        if(!result){
            return  res.status(400).json({ message: "error while fetching", success: false  ,data:result});
        }
        return res.status(200).json({ message: "Data fetched", success: true  ,data:result});
    } catch (error) {
        return  res.status(400).json({ message: error.message, success: false  ,data:result});
    }
});