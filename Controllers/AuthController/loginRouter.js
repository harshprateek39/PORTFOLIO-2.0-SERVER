import asyncHandler from "express-async-handler"
import { UserModel } from "../../Model/AuthModel/UserSchema.js";
import validator from "validator";
import bcrypt from  'bcrypt';
import session from "express-session";

 export const login = asyncHandler(async(req,res)=>{
    const {email, password}= req.body;
    console.log(email)
    function isValidEmail(emailx) {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        // Test the email against the regular expression
        return emailRegex.test(emailx);
      }
   try {
    if(!email){res.json({ message:"Please enter email"})}
    if(!password){res.json({ message:"Please enter password"})}
    if(!isValidEmail(email)){res.json({ message:"Invalid email"})}
    else{
    let user= await UserModel.findOne({email});
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message:"Bad Credentials"});
      }
     req.session.user = email;
    return  res.status(200).json({ message:"Login Sucess"});
    }
   } 
   catch (error) {
    res.status(500).json({
        success: false,
        message: error.message,
    });
   }
}); 
export const logout= asyncHandler(async(req,res)=>{
   req.session.destroy();
   return res.status(200).json({message: "Logout Sucess"});
}); 