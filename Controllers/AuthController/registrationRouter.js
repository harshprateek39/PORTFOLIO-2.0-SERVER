import asyncHandler from "express-async-handler"
import { UserModel } from "../../Model/AuthModel/UserSchema.js";
import validator from "validator";
import bcrypt from  'bcrypt';

 export const register = asyncHandler(async(req,res)=>{
    const {email, password}= req.body;
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
    else if(password.length<6){
        res.json({ message:"password too small"});
    }
    else{
    let user= await UserModel.findOne({email});
    if(user) {
        res.status(400).json({message:"User exist"}) 
    }
    const hashedpassword = await bcrypt.hash(password,10);
    // creation
    const data= await UserModel.create({email,password:hashedpassword});
    
    res.json(data);}
   } 
   catch (error) {
    res.status(500).json({
        success: false,
        message: error.message,
    });
   }
});

export const resetPassword = asyncHandler(async (req,res)=>{
    const { password ,newpassword, cnfnewpassword} =req.body;
    try {
         if(newpassword!=cnfnewpassword){
            res.json({ message:"Password must be same"});
         }
         
             const user =await UserModel.findById("65f6eb6515394d7f7b06b272");
             
             const legal= await bcrypt.compare(password,user.password);
             
             if(legal){
              const newp= await bcrypt.hash(newpassword,10);
              const newUser = await UserModel.findByIdAndUpdate("65f6eb6515394d7f7b06b272", {password:newp},
               { new: true }).exec();
               console.log(newUser);
              res.send("updated")
             }
             else {
                res.send({message:"wrong password"});
             }
             
    } catch (error) {
        res.json({"error":error.message})
    }
})

