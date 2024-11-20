import asyncHandler from "../utils/asyncHandler.js";

const UserRegister = asyncHandler(async(req, res)=>{
   res.status(200).json({
    success: true,
    message: "User registered successfully"
   })
});

export {
    UserRegister
}