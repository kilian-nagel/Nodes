
import connectDb from '../lib/dbConnection';
import mongoose from "mongoose";
import { postModel } from '@/models/posts';
import { NextApiRequest, NextApiResponse } from 'next/types';
import postData from '@/interfaces/post';

/**
 * 
 * @param  {[req:NextApiRequest]} req [ la requête contient un objet json de type postData qui correspond au post que l'on veut ajouter ]
 * @param  {[res:NextApiResponse]} res
 * @return {[void]}
 */
export async function addPost(req:NextApiRequest,res:NextApiResponse){
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
    } catch(err){
        console.error(err);
    }
}
/*
   Parameter : req with body that contains the query.
*/
export async function getAllPosts(req:NextApiRequest,res:NextApiResponse):Promise<postData[]>{
    let query = "";
    let posts = [];
    try {
        posts = await postModel.find({content:query});
        console.log(posts);
        return posts.body;
    } catch(err){
        console.error(err);
    }
    return posts;
}

connectDb();