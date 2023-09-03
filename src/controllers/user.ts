
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByGoogleID, getUserByName, getUsersByName } from '@/data/users';
import userSchema from '@/interfaces/user';
import { addUserError, userError, handleUserErrors, getUsersError, getUserError, modifyUserError } from '@/errors/userErrors';
import { sanitizeMongoQuery } from '@/data/sanitize';
import userModel, { userDocument } from "@/models/users";
import dbConnect from '@/lib/dbConnection';

/**
 * Add a new user to the database
 * 
 * @param req
 * @param res
 */
export async function addUser(req:NextApiRequest,res:NextApiResponse){
    const user:userSchema = req.body;
    try {
        const newUser = new userModel(user);
        await newUser.save().catch((err:Error)=>{
            throw new addUserError(err.message);
        });
        res.status(201).end();
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
 * @param req
 * @param res
 */
export async function getUsers(req:NextApiRequest,res:NextApiResponse){
    try {
        const query = sanitizeMongoQuery(req.body);
        const data:userDocument[] = await getUsersByName(query).catch((err:Error)=>{
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
 * Get user that match the uid
 * 
 * @param req
 * @param res
 */
export async function getUser(req:NextApiRequest,res:NextApiResponse){
    try {
        const queryType = sanitizeMongoQuery(req.body.queryType);
        let user:userDocument|null = null;

        switch(queryType){
            case "username":
                const username = sanitizeMongoQuery(req.body.username);
                user = await getUserByName(username).catch((err:Error)=>{
                    throw new getUserError(err.message);
                });
                break;
            case "googleID":
                const sub = sanitizeMongoQuery(req.body.sub);
                user = await getUserByGoogleID(sub).catch((err:Error)=>{
                    throw new getUserError(err.message);
                });
                break;
        }
        if(user!==null){
            res.status(200).send(user);
        } else {
            res.status(500);
        }
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