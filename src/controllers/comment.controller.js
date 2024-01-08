import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Comment } from "../models/comment.model.js"
ˀ

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query
    const comments = await Comment.find({video:videoId})
    res.status(200).json(new ApiResponse(200,{comments},"Comments fetched successfully"))

})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video

    const {videoId,content}=req.body
    const {user}=req.user
    const comment = Comment.create({
        content,
        video:videoId,
        owner:user._id
    })

    if(!comment){
        throw new ApiError(400,"Error creating comment")
    }

    res.status(201).json(new ApiResponse(201,{comment},"Comment pushed successfully"))

})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment

    const {videoId,updatedComment,commentId}=req.body;
    const comment = await Comment.findById(commentId);
    if(!comment){
        throw new ApiError(400,"Error finding the comment")
    }
    comment.content=updatedComment

    res.status(200).json(new ApiResponse(200,{content},"comment updated successfully"))
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const {commentId}=req.body;
    const isDeleted = await Comment.deleteOne(commentId)

    if(!isDeleted){
        throw new ApiError(400,"Error deleting comment")
    }

    res.status(200).json(new ApiResponse(200,{},"Comment deleted successfully"))
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }
