import { request, response } from 'express';
//import post from '../model/post.js';
import post from '../model/post.js';
import pkg from 'body-parser'; // Corrected import for body-parser
const { json, urlencoded } = pkg;
//import { json } from 'body-parser';
import Post from '../model/post.js';



export const createPost = async(request,repsonse) => {
    try{
        const post = await new post(request.body);
        post.save();

        return response.status(200).json('post saved successfully');

    }catch(error){
        return response.status(500).json(error);
    }
}

export const getAllPosts = async(request,response) =>{
    let category = request.query.category;
    let posts;
   try{
    if(category){
        posts = await Post.find({categories:category});
    }else{
         posts = await Post.find({});
    }
         
         return response.status(200).json(posts);
   }catch(error){
       return response.status(500).json({msg:error.message});
   }
} 

export const getPost = async (request,response) =>{
      try{
           const post = await Post.findById(request.params.id);

           return response.status(200).json(post);
      }catch(error){
           return response.status(500).json({msg:error.message})
      }
}

export const updatePost = async (request,response) =>{
    try{
        const post = await post.findById(request.params.id);

        if(!post){
            return response.status(404).json({msg:'post not found'});
        }

        await post.findByIdAndUpdate(request.params.id,{$set:request.body});   // #addToset
        return response.status(200).json({msg:'post updated successfully'});
    }catch(error){                              
        return response.status(500).json({error:error.message});
    }
}

export const deletePost = async (request,response) =>{
    try{
        const post  = await Post.findById(request.params.id);
        if(!post){
            return response.status(404).json({msg:'post not found'});
        }
        await post.delete();

        return response.status(200).json({msg:'post deleted successfully'});
                                
    }catch(error){
       return response.status(500).json({error:error.message});
    }
}