import cloudinary from "./cloudinary.js";

export const deleteImageOnCloudinary = async (publicId, image) => {
  try {
    // Upload the new image to Cloudinary
    await cloudinary.uploader.destroy(publicId);
   

    // Handle success response
    return { success: true,  message: "Deleted Successfully" };
  } catch (error) {
    // Handle error response
    return { success: false,  message: error.message };
  }
};
  