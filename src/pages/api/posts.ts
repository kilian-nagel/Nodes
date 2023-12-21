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
            await getPosts(req, res);
            break;
        }

        case 'POST': {
            await addPost(req,res);
            break;
        }

        case 'DELETE': {
            await deletePost(req,res);
            break;
        }

        case 'PUT': {
            await modifyPost(req,res);
            break;
        };
    }
}