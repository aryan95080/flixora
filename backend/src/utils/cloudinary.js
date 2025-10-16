import {V2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadToCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;

        // Upload the image to Cloudinary
        const response=await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"});
        // Remove the file from local uploads folder
        console.log("File uploaded to Cloudinary successfully:", response.url);
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath) // Remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

export {uploadToCloudinary};

// cloudinary.v2.uploader.upload("",{public_id:"sample_id"},
//     function(error, result) {console.log(result, error);});