
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
        res.send(posts);
    } catch(err){
        console.error(err);
        res.end();
    }
}

connectDb();