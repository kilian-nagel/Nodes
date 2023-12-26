import { addUser, getUser } from "@/controllers/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch(req.method){
        case 'GET':{
            await getUser(req,res);
            break;
        }
        case 'POST':{
            await addUser(req,res);
            break;
        }
    }
}