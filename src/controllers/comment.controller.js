import mongoose from 'mongoose';	
import {Comment} from '../models/comment.model.js'
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"


const getVideoComments = asyncHandler(async(req,res)=>{
    // get videoId from request params
    // find all comments for the video in db
    // return comments
})

const addComment = asyncHandler(async(req,res)=>{
    // get videoId from request params
    // get comment text from request body
    // create new comment object
    // save comment to db
    // return the new comment
})

const editComment = asyncHandler(async(req,res)=>{
    // get commentId from request params
    // get updated comment text from request body
    // find the comment in db
    // update the comment text
    // save the updated comment to db
    // return the updated comment
})

const deleteComment = asyncHandler(async(req,res)=>{
    // get commentId from request params
    // find the comment in db
    // delete the comment from db
    // return a success message
})


export {getVideoComments, addComment, editComment, deleteComment}