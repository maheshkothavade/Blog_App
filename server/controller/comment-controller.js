
import { request } from "express";
import comment from "../model/comment.js";

export const newComment = async(request,response) =>{
   try{
      const comment = await new comment(request.body);
      comment.save();

      response.status(200).json({msg:'comment saved successfully'});

   }catch(error){
       response.status(500).json({error:error.message});            // 21:50 lect 7

   }
}

export const getComments = async(request,response) =>{
    try{
      const comments =  await Comment.find({postId:request.params.id});

      response.status(200).json(comments);

    }catch(error){
      response.status(500).json({error:error.message});
    }
}

export const deleteComment = async(request,response) =>{
   try{
     const comment = await comment.findById(request.params.id);
     await comment.delete();

     response.status(200).json({msg:'comment deleted successfully'});
   }catch(error){
      response.status(500).json({error:error.message});
   }
}