
import { NextApiRequest, NextApiResponse } from 'next/types';
import { addPostError, getPostError, handlePostsErrors, postError } from '@/errors/postErrors';
import { sanitizeMongoQuery } from '@/data/sanitize';
import { addPostToDatabase, deleteFromDatabase, getRecentPostsFromDatabase, modifyPostFromDatabase } from '@/models/posts';
import dbConnect from '@/lib/dbConnection';
import { getUserByUid } from '@/models/users';

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
    try {   
        const postUpdated = JSON.parse(req.body);
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

/**
 * Modify the post that has the uid of the post passed in parameter. It will replace the old post ( the one in the database ) with the one passed in parameter
 * 
 * @param req
 * @param res 
**/
export async function deletePost(req:NextApiRequest,res:NextApiResponse){
    let idPost = req.body;
    console.log(idPost);
    try {
        deleteFromDatabase(idPost);
        res.status(200).end();
    } catch(err:unknown){
        if(err instanceof postError){
            handlePostsErrors(err);
        } else if(err instanceof Error) {
            console.error(err);
        }
        console.error(err);
        const response = {
            success:false,
            data:"failed to delete the post"
        }

        res.send(response);
        res.status(500).end();
    }
}

dbConnect();
