import cloudinary from "./cloudinary.js";

export const updateImageOnCloudinary = async (publicId, image) => {
  try {
    // Upload the new image to Cloudinary
    await cloudinary.uploader.destroy(publicId);
    const uploadedImage = await cloudinary.uploader.upload(image, {
      public_id: publicId, // Specify the public id
      overwrite: true // Overwrite existing image if it exists
    });

    // Handle success response
    return { success: true, data: {public_id:uploadedImage.public_id, url:uploadedImage.url}, message: "Updated Successfully" };
  } catch (error) {
    // Handle error response
    return { success: false, data: null, message: error.message };
  }
};
  