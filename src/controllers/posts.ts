
import { NextApiRequest, NextApiResponse } from 'next/types';
import { addPostError, getPostError, handlePostsErrors, postError } from '@/errors/postErrors';
import { sanitizeMongoQuery } from '@/data/sanitize';
import { addPostToDatabase, getRecentPostsFromDatabase, modifyPostFromDatabase } from '@/models/posts';
import dbConnect from '@/lib/dbConnection';
import { getUserByUid } from '@/models/users';

console.log('the AUTH0_SECRET env var is set: ', process.env.AUTH0_SECRET);
console.log('the NODE_ENV env var is set: ', process.env.NODE_ENV);
console.log('the AUTH0_CLIENT_ID env var is set: ', process.env.AUTH0_CLIENT_ID);
console.log('the AUTH0_CLIENT_SECRET env var is set: ', process.env.AUTH0_CLIENT_SECRET);
console.log('the AUTH0_BASE_URL env var is set: ', process.env.AUTH0_BASE_URL);

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

        addPostToDatabase(postData);
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
        const populatedPosts = await getRecentPostsFromDatabase();
        if(populatedPosts === undefined) throw new getPostError("failed to get posts");

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
        modifyPostFromDatabase(postUpdated);
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
