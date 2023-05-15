
import connectDb from '../lib/dbConnection';
import { postModel } from '@/models/posts';
import { NextApiRequest, NextApiResponse } from 'next/types';
import postSchema from '@/interfaces/post';

/**
 * Add a new post to the database
 * 
 * @param req - request that contains data of the post wich will be added.
 * @param res
 */
export async function addPost(req:NextApiRequest,res:NextApiResponse): Promise<void> {
    const postData:postSchema = await JSON.parse(req.body);
    try {
        let post = new postModel({
            uid:postData?.uid,
            content:postData?.content,
            category:postData?.category,
            source:postData?.source,
            time:postData?.time
        })
        post.save();
        res.status(200).end();
    } catch(err){
        console.error(err);
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
    let posts:postSchema[] = [];
    try {
        posts = await postModel.find({}).limit(10);  
        res.status(200).send(posts);
        res.end();
    } catch(err){
        console.error(err);
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
    let postUpdated = req.body.post;

    try {
        await postModel.replaceOne({uid:postUpdated.uid},postUpdated);
    } catch(err){
        console.error(err);
        res.status(500).end();
    }

    res.status(200).end();
}

connectDb();