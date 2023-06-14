
import connectDb from '../lib/dbConnection';
import { postModel } from '@/models/posts';
import { NextApiRequest, NextApiResponse } from 'next/types';
import postSchema from '@/interfaces/post';
import { addPostError, getPostError, handlePostsErrors, modifyPostError, postError } from '@/errors/postErrors';
import { sanitizeMongoQuery } from '@/data/sanitize';

/**
 * Add a new post to the database
 * 
 * @param req - request that contains data of the post wich will be added.
 * @param res
 */
export async function addPost(req:NextApiRequest,res:NextApiResponse): Promise<void> {
    const data = sanitizeMongoQuery(req.body);
    const postData:postSchema = await JSON.parse(data);
    try { 
        const newPost = new postModel({
            uid:postData?.uid,
            content:postData?.content,
            category:postData?.category,
            source:postData?.source,
            time:postData?.time
        })
        await newPost.save().catch((err:Error)=>{
            throw new addPostError(err.message);
        });
        res.status(200).end();
    } catch(err:unknown){
        if(err instanceof postError){
            handlePostsErrors(err);
        }else{
            console.error(err);
        }
        res.status(500).end();
    }
}

/**
 * Get 10 posts from the database
 * 
 * @param req
 * @param res - response that contains an array of 10 posts
 */
export async function getAllPosts(req:NextApiRequest,res:NextApiResponse): Promise<void> {
    try {
        const posts = await postModel.find({}).limit(10).catch((err:Error)=>{
            throw new getPostError(err.message);
        })  
        res.status(200).send(posts);
        res.end();
    } catch(err:unknown){
        if(err instanceof postError){
            handlePostsErrors(err);
        }else if(err instanceof Error){
            console.error("Unknwon error : "+err.message);
        }
        res.status(500).end();
    }
}

/**
 * Modify the post that has the uid of the post passed in parameter. It will replace the old post ( the one in the database ) with the one passed in parameter
 * 
 * @param req - request that contains the with the updated content.
 * @param res 
 */
export async function modifyPost(req:NextApiRequest,res:NextApiResponse){
    const postUpdated = req.body.post;
    try {
        await postModel.replaceOne({uid:postUpdated.uid},postUpdated).catch((err:Error)=>{
            throw new modifyPostError(err.message);
        });
        res.status(200).end();
    } catch(err:unknown){
        if(err instanceof postError){
            handlePostsErrors(err);
        } else if(err instanceof Error) {
            console.error(err);
        }
        console.error(err);
        res.status(500).end();
    }
}

connectDb();