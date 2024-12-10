import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const getChannelStatus = asyncHandler(async(req,res)=>{
    // get channelId from request params
    // find subscription details for user and channel
    // find video views for user and channel
    // find video likes for user and channel
    // return channel status
})

const getChannelVideos = asyncHandler(async(req,res)=>{
    // get channelId from request params
    // find videos for the channel
    // paginate results
    // return videos
})

export {
    getChannelStatus,
    getChannelVideos,
    
}