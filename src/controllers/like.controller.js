import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"


const toggleVideoLike = asyncHandler(async(req,res)=>{
    // get videoId from request params
    // check if user already likes the video
    // if yes, remove the like from db and decrease like count
    // if no, add the like to db and increase like count
    // return updated video with like count
})

const toggleCommentLike = asyncHandler(async(req,res)=>{
    // get commentId from request params
    // check if user already likes the comment
    // if yes, remove the like from db and decrease like count
    // if no, add the like to db and increase like count
    // return updated comment with like count
})

const toggleTweetLike = asyncHandler(async(req,res)=>{
    // get tweetId from request params
    // check if user already likes the tweet
    // if yes, remove the like from db and decrease like count
    // if no, add the like to db and increase like count
    // return updated tweet with like count
})

const getLikedVideo = asyncHandler(async(req,res)=>{
    // get videoId, commentId or tweetId from request params
    // find all likes for the given video, comment or tweet in db
    // return likes
})

export {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getLikedVideo,
}