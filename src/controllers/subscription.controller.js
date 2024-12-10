import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"

const toggleSubscription = asyncHandler(async(req,res)=>{
    // get userId from request params
    // get videoId from request params
    // check if user is authenticated
    // check if video exists
    // check if user is already subscribed to the video
    // toggle subscription status (subscribe/unsubscribe)
    // return updated user object with subscription status
})

const getUserChannelSubscribers = asyncHandler(async(req,res)=>{
    // get userId from request params
    // find all subscribers for the user in db
    // return subscribers

})

const getChannelSubscriptions = asyncHandler(async(req,res)=>{
    // get userId from request params
    // find all subscriptions for the user in db
    // return subscriptions
    // include video details in response
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getChannelSubscriptions,
}


