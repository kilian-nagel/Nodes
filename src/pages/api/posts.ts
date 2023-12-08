import { addPost, deletePost, getAllPosts } from "@/controllers/posts";
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
            getAllPosts(req, res);
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
    }
}