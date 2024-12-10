import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async(req,res)=>{
    // get user from request
    // create a new tweet with the user and the content
    // save the tweet in the database
    // return the created tweet
})

const getUserTweets = asyncHandler(async(req,res)=>{
    // get userId from request params
    // find all tweets for the user in the database
    // return the tweets
})

const updateTweet = asyncHandler(async(req,res)=>{
    // get tweetId from request params
    // find the tweet in the database
    // check if the user is the owner of the tweet
    // update the tweet content
    // save the updated tweet in the database
    // return the updated tweet
})

const deleteTweet = asyncHandler(async(req,res)=>{
    // get tweetId from request params
    // find the tweet in the database
    // check if the user is the owner of the tweet
    // delete the tweet from the database
    // return a success message
})

export {
    createTweet,
    getUserTweets,
    deleteTweet,
    updateTweet,
}
    
