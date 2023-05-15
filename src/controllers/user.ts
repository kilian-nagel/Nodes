
import connectDb from '../lib/dbConnection';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByName, getUsersByName } from '@/data/users';
import userSchema from '@/interfaces/user';

const userModel = require("../models/users");

/**
 * Add a new user to the database
 * 
 * @param req - request made from the client-side, contains data of the post wich will be added.
 * @param res
 */
export async function addUser(req:NextApiRequest,res:NextApiResponse){
    const user:userSchema = req.body;
    try {
        let userExists:boolean = userModel.exists({name:user.username});
        if(!userExists){
            const newUser = new userModel({
                uid:user.uid,
                username:user.username,
                picture:user.picture,
                friends:user.friends,
                messages:user.messages,
                posts:user.posts
            });
            newUser.save();
            res.status(201).end();
        } else {
            console.error("user already exists");
            res.status(500).end();
        }
    } catch(err){
        console.error(err);
        res.status(500).end();
    }
}

export async function getUsers(username:string){
    try {
        let data:Array<user>;
        data = await userModel.find({})
        return data;
    } catch(err){
        throw err;
    }
}


export async function getUser(username:string){
    try {
        let user:user;
        user = await userModel.findOne({username:username})
        return user;
    } catch (err){
        throw err;
    }
}

export async function modifyUser(userUpdated:userSchema){
    try {
        let user = await(getUser(userUpdated.uid));
        await userModel.update({uid:userUpdated.uid},{$set:{username:userUpdated.username,picture:userUpdated.picture,friends:userUpdated.friends,messages:userUpdated.messages,posts:userUpdated.posts}});
    } catch(err){
        throw err;
    }
}

export async function addUser(user:userSchema){
    try {
        let result = await (await getUser(user.username));
        console.log(result);
        if(result !== undefined){
            const userM = new userModel({
                uid:user.uid,
                username:user.username,
                picture:user.picture,
                friends:user.friends,
                messages:user.messages,
                posts:user.posts
            });
            userM.save();
        } else {
            throw new Error("User already exists");1   
        }
    } catch(err){
        throw err;
    }
}


connectDb();