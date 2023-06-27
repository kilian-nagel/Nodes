
import connectDb from '../lib/dbConnection';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByName, getUsersByName } from '@/data/users';
import userSchema from '@/interfaces/user';
import { addUserError, userError, handleUserErrors, getUsersError, getUserError, modifyUserError } from '@/errors/userErrors';
import { sanitizeMongoQuery } from '@/data/sanitize';

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
        const username = sanitizeMongoQuery(user.username)
        const userExists:boolean = userModel.exists({name:username});
        if(!userExists){
            const newUser = new userModel({
                uid:user.uid,
                username:user.username,
                picture:user.picture,
                friends:user.friends,
                messages:user.messages,
                posts:user.posts
            });
            await newUser.save().catch((err:Error)=>{
                throw new addUserError(err.message);
            });
            res.status(201).end();
        } else {
            throw new addUserError("user already exists");
        }
    } catch(err:unknown){
        if (err instanceof userError){
            handleUserErrors(err);
        } else if ( err instanceof Error ){
            console.error(err.message);
        }
        res.status(500).end();
    }
}

/**
 * Get all the users that match the specified query
 * 
 * @param req - request made from the client-side, contains the query
 * @param res
 */
export async function getUsers(req:NextApiRequest,res:NextApiResponse){
    try {
        const query = sanitizeMongoQuery(req.body);
        const data:userSchema[] = await getUsersByName(query).catch((err:Error)=>{
            throw new getUsersError(err.message);
        });
        res.status(200).send(data);
        res.end();
    } catch(err:unknown){
        if (err instanceof userError){
            handleUserErrors(err);
        } else if ( err instanceof Error ){
            console.error(err.message);
        }
        res.status(500).end();
    }
}

/**
 * Get user that has match exaclty the query
 * 
 * @param req - request made from the client-side,contains the query
 * @param res
 */
export async function getUser(req:NextApiRequest,res:NextApiResponse){
    try {
        const username = sanitizeMongoQuery(req.body.username);
        let user:userSchema;
        user = await getUserByName(username).catch((err:Error)=>{
            throw new getUserError(err.message);
        });
        res.status(200).send(user);
        res.end();
    } catch (err:unknown){
        if (err instanceof userError){
            handleUserErrors(err);
        } else if ( err instanceof Error ){
            console.error(err.message);
        }
        res.status(500).end();
    }
}

/**
 * Modify the user that has the same uid as the user passed in parameter. The old user ( the one present in the database ) will be replaced with the user passed in parameter.
 * 
 * @param req - request made from the client-side, contains the user updated.
 * @param res
 */
export async function modifyUser(req:NextApiRequest,res:NextApiResponse){
    const userUpdated = req.body.user;
    const uid = sanitizeMongoQuery(userUpdated.uid);
    try {
        await userModel.replaceOne({uid:uid},userUpdated).catch((err:Error)=>{
            throw new modifyUserError(err.message);
        });
    } catch(err:unknown){
        if (err instanceof userError){
            handleUserErrors(err);
        } else if ( err instanceof Error ){
            console.error(err.message);
        }
        res.status(500).end();
    }
}

dbConnect();