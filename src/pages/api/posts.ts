import { addPost, deletePost, getPosts, modifyPost } from "@/controllers/posts";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200,
     });

    switch (req.method) {
        case 'GET': {
            // id(unique),name(plusieurs),contenu de post(plusieurs), 
            getPosts(req, res);
            break;
        }

        case 'POST': {
            addPost(req,res);
            break;
        }

        case 'DELETE': {
            deletePost(req,res);
            break;
        }

        case 'PUT': {
            modifyPost(req,res);
            break;
        };
    }
}