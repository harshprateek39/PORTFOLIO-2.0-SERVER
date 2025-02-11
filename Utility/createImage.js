import cloudinary from "./cloudinary.js";

export const createImageOnCloudinary = async ( image) => {
  try {
    // Upload the new image to Cloudinary
   
    const uploadedImage = await cloudinary.uploader.upload(image);

    // Handle success response
    return { success: true, data: {public_id:uploadedImage.public_id, url:uploadedImage.url}, message: "Image Created Successfully" };
  } catch (error) {
    // Handle error response
    return { success: false, data: null, message: error.message };
  }
};
