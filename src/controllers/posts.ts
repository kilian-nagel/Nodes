
import { NextApiRequest, NextApiResponse } from 'next/types';
import { addPostError, getPostError, handlePostsErrors, postError } from '@/errors/postErrors';
import { sanitizeMongoQuery } from '@/data/sanitize';
import dbConnect from '@/lib/dbConnection';
import { addPostToDatabase } from '@/models/repository/post/ADD';
import { deleteFromDatabase } from '@/models/repository/post/DELETE';
import { modifyPostFromDatabase } from '@/models/repository/post/MODIFY';
import { getUserByUid } from '@/models/repository/users/GET';
import { getRequests } from '@/models/repository/post/GET';

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
export async function getPosts(req:NextApiRequest,res:NextApiResponse): Promise<void> {
    try {
        if(!(typeof req.query.query === 'string')) throw new getPostError("err");
        if(!(typeof req.query.queryType === 'string')) throw new getPostError("err");

        const queryType = sanitizeMongoQuery(req.query.queryType);
        const query = sanitizeMongoQuery(req.query.query);

        const queryTypesMultipleDocuments = ["none","content"];
        const queryTypesSingleDocument = ["_id","userId"];

        let responseData;
        if(queryTypesMultipleDocuments.includes(queryType)){
            responseData = await getRequests.getPosts(query,queryType);
        } else if(queryTypesSingleDocument.includes(queryType)){
            responseData = await getRequests.getPost(query,queryType);
        }

        if(responseData === undefined) throw new getPostError("failed to get posts");
        res.status(200).send(responseData);
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
