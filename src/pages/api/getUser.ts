import type { NextApiRequest, NextApiResponse } from 'next'
import connectDb from './connection';
const user = require("../../models/users");

export default async function getUser(  req: NextApiRequest,
    res: NextApiResponse){
    connectDb();
    console.log("hi");
    const data = await user.find({});
    res.status(200).json({success:true,data:data});
}