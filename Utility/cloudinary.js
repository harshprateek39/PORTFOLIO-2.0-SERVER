import cloudinary from  'cloudinary';
import dotenv from "dotenv";
dotenv.config()
  cloudinary.config({
    cloud_name:process.env.NAME,
    api_key:process.env.API,
    api_secret:process.env.SECRET
});
export default cloudinary;

