import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import {ApiError} from '../utils/apiError.js'

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME , 
    api_key:process.env.CLOUDINARY_API_KEY , 
    api_secret:process.env.CLOUDINARY_API_SECRET 
});

const uploadCloudinary = async function(localFilePath) {
    try {
        if(!localFilePath) return null;
        // file cloudinary te upload hocce
        const result = await cloudinary.uploader.upload(localFilePath,{resource_type:'auto'});
        // file local system te delete hocce
        fs.unlinkSync(localFilePath);
        // return result.secure_url;
        return result;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        throw new ApiError(500, 'Cloudinary upload failed')
        return null;
    }
};

export default uploadCloudinary