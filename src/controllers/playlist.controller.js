import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createPlayList = asyncHandler(async(req,res)=>{
    // validate request body
    // create new playlist in db
    // return created playlist

})

const getUserPlayLists = asyncHandler(async(req,res)=>{
    // get userId from request params
    // find all playlists for the user in db
    // return playlists
    // pagination
})

const getPlaylistById = asyncHandler(async(req,res)=>{
    // get playlistId from request params
    // find the playlist in db
    // return playlist
    // validate playlist exists
})

const updatePlaylist = asyncHandler(async(req,res)=>{
    // get playlistId from request params
    // find the playlist in db
    // update the playlist with new details
    // return updated playlist
})

const deletePlaylist = asyncHandler(async(req,res)=>{
    // get playlistId from request params
    // find the playlist in db
    // delete the playlist from db
    // return success message
})

const addVideoToPlaylist = asyncHandler(async(req,res)=>{
    // get playlistId from request params
    // get videoId from request body
    // validate playlist and video exist
    // add video to playlist in db
    // return updated playlist
})

const removeVideoFromPlaylist = asyncHandler(async(req,res)=>{
    // get playlistId from request params
    // get videoId from request body
    // validate playlist and video exist
    // remove video from playlist in db
    // return updated playlist
})

export{
    createPlayList,
    getUserPlaylists,
    getPlaylistById,
    updatePlaylist,
    deletePlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
}