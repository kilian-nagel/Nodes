import { addUser, getUser } from "@/controllers/user";
import { NextApiRequest, NextApiResponse } from "next";
const l = console.log;

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    switch(req.method){
        case 'GET':{
            getUser(req,res);
            break;
        }
        case 'POST':{
            addUser(req,res);
            break;
        }
    }
}