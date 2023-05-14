
import connectDb from '../lib/dbConnection';
import { postModel } from '@/models/posts';
import { NextApiRequest, NextApiResponse } from 'next/types';
import postData from '@/interfaces/post';

/**
 * 
 * @param  {[req:NextApiRequest]} req [ la requête contient un objet json de type postData qui correspond au post que l'on veut ajouter ]
 * @param  {[res:NextApiResponse]} res
 * @return {[void]}
 */
export async function addPost(req:NextApiRequest,res:NextApiResponse): Promise<void> {
    const postData = JSON.parse(req.body);
    console.log(postData);
    try {
        let post = new postModel({
            content:postData?.content,
            category:postData?.category,
            source:postData?.source,
            time:postData?.time
        })
        post.save();
        res.end();
    } catch(err){
        console.error(err);
    }
}

export async function getAllPosts(req:NextApiRequest,res:NextApiResponse): Promise<void> {
    let posts:postData[] = [];
    try {
        posts = await postModel.find({}).limit(10);  
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