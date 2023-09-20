
import { NextApiRequest, NextApiResponse } from 'next/types';
import { addPostError, getPostError, handlePostsErrors, modifyPostError, postError } from '@/errors/postErrors';
import { sanitizeMongoQuery } from '@/data/sanitize';
import postModel from '@/models/posts';
import userModel from '@/models/users';
import dbConnect from '@/lib/dbConnection';
import { getUserByUid } from '@/lib/users';

/**
 * Add a new post to the database
 * 
 * @param req contains post data , and uid of the user wich sent it.
 * @param res
**/
export async function addPost(req:NextApiRequest,res:NextApiResponse): Promise<void> {
    let postDataRaw = await JSON.parse(req.body);
    let uid = sanitizeMongoQuery(postDataRaw.source);
    try { 
        // We fetch the id of the user in mongoose db to set up the source of the post correctly.
        const postData = {...postDataRaw};
        
        const sourceUser = await getUserByUid(uid);
        if(sourceUser===undefined) throw new addPostError("can't find source user");
        const userObjectId = sourceUser._id;

        postData.source = userObjectId;

        const newPost = new postModel(postData);
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
 * Get 10 most recents posts from the database
 * 
 * @param req
 * @param res
**/
export async function getAllPosts(req:NextApiRequest,res:NextApiResponse): Promise<void> {
    try {
        const posts = await postModel.find({}).limit(10).catch((err:Error)=>{
            throw new getPostError(err.message);
        });
        const populatedPosts = await postModel.populate(posts, { path: "source", model: userModel });

        res.status(200).send(populatedPosts);
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
 * @param req
 * @param res 
**/
export async function modifyPost(req:NextApiRequest,res:NextApiResponse){
    const postUpdated = req.body.post;
    try {
            await postModel.replaceOne({_id:postUpdated._id},postUpdated).catch((err:Error)=>{
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

dbConnect();
