
import { NextApiRequest, NextApiResponse } from 'next';
import { userError, handleUserErrors, getUserError } from '@/errors/userErrors';
import { sanitizeMongoQuery } from '@/data/sanitize';
import userModel, { userDocument } from "@/models/users";
import dbConnect from '@/lib/dbConnection';
import { createUser, addUserToDatabase } from '@/models/repository/users/ADD';
import { getUsersByName, getUserByUid } from '@/models/repository/users/GET';
import { modifyUserFromDatabase } from '@/models/repository/users/MODIFY';

/**
 * Add a new user to the database
 * 
 * @param req
 * @param res
 */
export async function addUser(req:NextApiRequest,res:NextApiResponse){
    const uid = sanitizeMongoQuery(req.body.sub);
    const username = sanitizeMongoQuery(req.body.username); 
    try {
        const userObject = createUser(uid,username);
        const newUser = new userModel(userObject);
        addUserToDatabase(newUser,uid);

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
        if(req.query.query === undefined || Array.isArray(req.query.query)) throw new getUserError("sub parameter incorrect");
        
        const query = sanitizeMongoQuery(req.query.query);
        const users:userDocument[] = await getUsersByName(query);
        res.status(200).send(users);
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
export async function getUser(req:NextApiRequest,res:NextApiResponse):Promise<userDocument|null|undefined>{
    try {
        if(req.query.sub === undefined || Array.isArray(req.query.sub)) throw new getUserError("sub parameter undefined");

        const uid = sanitizeMongoQuery(req.query.sub);
        const user = await getUserByUid(uid);
        if(user === undefined) throw new getUserError("failed to get user"); 

        res.send(user);
        res.end();
    } catch (err:unknown){
        if (err instanceof userError){
            handleUserErrors(err);
        } else if ( err instanceof Error ){
            console.error(err.message);
        }
        res.send(null);
        res.status(404).end();
        return;
    }
}



/**
 * Modify the user that match the uid. 
 * The old user ( the one present in the database ) will be replaced with the user passed in parameter.
 * 
 * @param req
 * @param res
 */
export async function modifyUser(req:NextApiRequest,res:NextApiResponse){
    const userUpdated = req.body.user;
    const uid = sanitizeMongoQuery(userUpdated.uid);
    try {
        modifyUserFromDatabase(uid,userUpdated);
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