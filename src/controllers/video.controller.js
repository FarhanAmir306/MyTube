import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

const getAllVideos = asyncHandler(async(req,res)=>{
    // get all videos from db
    // return videos
    // pagination, sorting, filtering
    
})

const publishVideo = asyncHandler(async(req,res)=>{
    // validate request body
    // create new video document in db
    // upload video file to cloudinary
    // return video details
})

const getVideoById = asyncHandler(async(req,res)=>{
    // get video by id from db
    // return video
    // check if video exists
    // check if user is authorized to view video
})

const updateVideo = asyncHandler(async(req,res)=>{
    // get video by id from db
    // validate request body
    // update video document in db
    // upload new video file if provided
    // return updated video details
    // check if video exists
    // check if user is authorized to update video
})

const deleteVideo = asyncHandler(async(req,res)=>{
    // get video by id from db
    // delete video document from db
    // return deleted video details
    // check if video exists
    // check if user is authorized to delete video
})

const togglePublishStatus = asyncHandler(async(req,res)=>{
    // get video by id from db
    // toggle publish status
    // update video document in db
    // return updated video details

    // check if video exists
    // check if user is authorized to toggle publish status

})

export {
    getAllVideos,
    publishVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
    
}