
import { NextApiRequest, NextApiResponse } from 'next';
import { addUserError, userError, handleUserErrors, getUsersError, getUserError, modifyUserError } from '@/errors/userErrors';
import { sanitizeMongoQuery } from '@/data/sanitize';
import userModel, { userDocument } from "@/models/users";
import dbConnect from '@/lib/dbConnection';
import { createUser, getUserByUid, getUsersByName } from '@/lib/users';

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

        // Check if user already exists before adding it to db
        const userExistsInDb = await userModel.exists({uid:req.body.sub}).catch((err:Error)=>{
            throw new addUserError(err.message);
        });
        if(userExistsInDb!==null){
            throw new addUserError("User already exists");
        }

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
export async function getUser(req:NextApiRequest,res:NextApiResponse):Promise<userDocument|null|undefined>{
    try {
        let user:userDocument|undefined;
        if(req.query.sub === undefined || Array.isArray(req.query.sub)) throw new getUserError("sub parameter undefined");

        const uid = sanitizeMongoQuery(req.query.sub);

        // Check if user exists
        const userExistsInDb = await userModel.exists({uid:uid}).catch((err:Error)=>{
            throw new getUserError(err.message);
        });
        if(userExistsInDb===null){
            res.status(200).send("undefined");
            res.end();
            return;
        }

        // if user exists we fetch its data
        user = await getUserByUid(uid).catch((err:Error)=>{
            throw new getUserError(err.message);
        });
        if(user===null || user===undefined){
            throw new getUserError("user undefined");
        } else {
            res.status(200).send(user);
        }

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