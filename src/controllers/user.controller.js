import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadCloudinary } from "../utils/cloudinary.js";


// const  generateAccessTokenAndRefreshToken =async(userId)=>{
//     // Generate access token and refresh token
//     // Access token - expire after 15 minutes
//     // Refresh token - expire after 1 month
//     // return access token and refresh token

//     try {
        
//         const user =await User.findById(userId);
//         const accessToken = user.generateAccessToken()
//         const refreshToken = user.generateRefreshToken()
//         user.refreshToken = refreshToken;
//         await user.save({validateBeforeSave: false})
        
//         return {accessToken, refreshToken}


//     } catch (error) {
//         throw new ApiError(500,'Something went wrong while generating access token and refresh token')
//     }

// }

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");
  
      const accessToken = user.generateAccessToken();
    //   console.log("Access Token:", accessToken);
  
      const refreshToken = user.generateRefreshToken();
    //   console.log("Refresh Token:", refreshToken);
  
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
  
      return { accessToken, refreshToken };
    } catch (error) {
      console.error("Token Generation Error:", error);
      throw new ApiError(500, "Something went wrong while generating access token and refresh token");
    }
};

const UserRegister = asyncHandler(async(req, res)=>{
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const {userName,fullName,email,password} =req.body

    if(
        /* The code `[userName, fullName, email, password].some((field) => field?.trim() === "")` is
        checking if any of the fields (userName, fullName, email, password) are empty or contain
        only whitespace characters after trimming. */
        [userName,fullName, email, password].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,'All fields must be fullfilled !')
    }

    // Check if user already exists
    const existedUser = await User.findOne({
        $or:[{userName},{email}]
    })
    
    if(existedUser){
        throw new ApiError(409,'User already exists!')
    }
    /* The code `const avatar = req.files?.avatar[0]?.path` is attempting to access the `avatar`
    property from the `files` object in the `req` (request) object. */
    // req.files eta multer use korar karone inbuild pawa jay
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath =req.files?.coverImage[0]?.path;
    

    if(!avatarLocalPath){
        throw new ApiError(400,'Please upload an avatar!')
    }

    let coverImageLocalPath;

    if (req.files?.coverImage?.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    } else {
        throw new ApiError(400, "Please upload a cover image!");
    }

   
    
    
    // Upload avatar to cloudinary
    const avatar = await uploadCloudinary(avatarLocalPath)
    const coverImage = await uploadCloudinary(coverImageLocalPath)

    console.log("req.files:", req.files);
    console.log("avatarLocalPath:", avatarLocalPath);
    console.log("coverImageLocalPath:", coverImageLocalPath);


    if(!avatar) throw new ApiError(400,'Upload avatar failed')
    if (!coverImage) {
            throw new ApiError(400, "Cover image upload failed!");
        }
        // Create user object
    const user = await User.create({
        userName:userName.toLowerCase(),
        fullName,
        email,
        password,
        // avatar:avatar.secure_url,
        // coverImage:coverImage.secure_url
        avatar:avatar.url,
        coverImage:coverImage?.url || ""
    })

    // Remove sensitive fields
    // user.password = 0;
    // user.refreshToken = 0;

    const createdUser = await User.findById(user._id).select(
        '-password -refreshToken'	
    )
    if(!createdUser) throw new ApiError(500,'somthing went wrong registering the user')
    return res.status(201).json(
        // {success:true,
        // data:createdUser}
        new ApiResponse(200,createdUser,'User Registered Success')
    )
    
});

const LoginUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user exists: username, email
    // check for password
    // generate token
    // return res


    const { userName,email,password } = req.body
    if(!userName && !email){
        throw new ApiError(400,'Please provide either username or email!')
    }
    const user = await User.findOne({
        $or:[{userName},{email}]
    })
    
    // if(!user ||!user.matchPassword(password)){
    //     throw new ApiError(401,'Invalid credentials!')
    // }

    if(!user){
        throw new ApiError(404,'User not found!')
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401,'Invalid credentials!')
    }
    
    // Generate access token and refresh token
    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id).catch(err => {
        throw new ApiError(500, 'Failed to generate tokens!');
    });
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    
    // cookies
    const options ={
        httpOnly:true,
        secure:true,
    }

    return res.status(200)
    .cookie("accessToken", accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,accessToken,refreshToken
            },
            'User Logged In Successfully'
        )
    )
        
    

})

const LogoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        { 
            $unset:{
                refreshToken:1 // this removes the field from document
            }
        },
        { new: true }
    );
    const options={
        httpOnly:true,
        secure:true,
    }
    return res.status(200)
    .clearCookie('accessToken',options)
    .clearCookie('refreshToken',options)
    .json(
        new ApiResponse(200,{},'Logout Successfully')
    )
})

const refreshAccessToken = asyncHandler(async(req,res)=>{

    // get refreshToken from cookie
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken ;
    if(!incomingRefreshToken){
        throw new ApiError(401,'Unauthenticated request')
    }
    try {
        // verify refreshToken
        const decodedRefreshToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET);
        if(!decodedRefreshToken){
            throw new ApiError(401,'Invalid refresh token')
        }
        // get user from db
        const user = await User.findById(decodedRefreshToken._id);
        if(!user){
            throw new ApiError(401,'Invalid user')
        }

        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401,'Invalid refresh token')
        }


        // generate new access token
        const { accessToken,newRefreshToken } = await generateAccessTokenAndRefreshToken(user._id);

        const options={
            httpOnly:true,
            secure:true,
        }

        return res.status(200)
        .cookie("accessToken", accessToken,options)
        .cookie("refreshToken", newRefreshToken,options)
        .json(
            new ApiResponse(
                200,
                {
                accessToken, refreshToken:newRefreshToken
                },
                'Access token refreshed successfully'
            )
        )

    } catch (error) {
        console.error("Token Refresh Error:", error);
        throw new ApiError(500, "Failed to refresh access token");
    }
})

const changeCurrentPassword = asyncHandler(async(req,res)=>{

    const {oldPassword,newPassword} = req.body;
    if(!oldPassword ||!newPassword){
        throw new ApiError(400,'Please provide old and new password!')
    }
    const user = await User.findById(req.user?._id);
    if(!user){
        throw new ApiError(404,'User not found!')
    }
    const isPasswordValid = await user.isPasswordCorrect(oldPassword);
    if(!isPasswordValid){
        throw new ApiError(401,'Invalid old password!')
    }
    // Update password
    user.password = newPassword;
    await user.save({validateBeforeSave:false});
    return res.status(200).json(
        new ApiResponse(200,{},'Password changed successfully')
    )
})

const getCurrentUser =asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user?._id).select('-password -refreshToken');
    if(!user){
        throw new ApiError(404,'User not found!')
    }
    return res.status(200).json(
        new ApiResponse(200,user,'User fetched successfully')
    )
})

const updateUserDetails = asyncHandler(async(req,res)=>{

    const {userName,fullName,email} = req.body;
    if(!userName && !fullName &&!email){
        throw new ApiError(400,'Please provide at least one field to update!')
    }
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                userName:userName?.toLowerCase() || user.userName,
                fullName,
                email
            }
        },
        { new: true}
    ).select("-password");
    if(!user){
        throw new ApiError(404,'User not found!')
    }
    return res.status(200).json(
        new ApiResponse(200,user,'User updated successfully')
    )

});

const uploadAvatar = asyncHandler(async (req, res) => {
    // Upload avatar to cloudinary
    const avaterLocalPath= req.file?.path
    const avatar = await uploadCloudinary(avaterLocalPath)
    if(!avatar.url) throw new ApiError(400,'Upload avatar failed')
        
    // Update user avatar
    const updatedUser = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar: avatar.url
            }
        },
        { new: true }
    ).select('-password');

    if(!updatedUser) throw new ApiError(404,'User not found!')
    return res.status(200).json(
        new ApiResponse(200,updatedUser,'Avatar uploaded successfully')
    )
})

const uploadCoverImage = asyncHandler(async (req, res) => {
    // Upload cover image to cloudinary
    const coverImageLocalPath= req.file?.path
    const coverImage = await uploadCloudinary(coverImageLocalPath)
    if(!coverImage.url) throw new ApiError(400,'Upload cover image failed')
    
    //   TODO: delete oldImage  

    // Update user cover image
    const updatedUser = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                coverImage: coverImage.url
            }
        },
        { new: true }
    ).select('-password');
    if(!updatedUser) throw new ApiError(404,'User not found!')
        
    return res.status(200).json(
        new ApiResponse(200,updatedUser,'Cover image uploaded successfully')
    )
})

export {
    UserRegister,
    LoginUser,
    LogoutUser,
    generateAccessTokenAndRefreshToken,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateUserDetails,
    uploadAvatar,
    uploadCoverImage,
}