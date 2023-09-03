import { sanitizeMongoQuery } from "@/data/sanitize";
import userModel, { userDocument } from "@/models/users";

/**
 * Get all users of the database that match the query passed in parameter
 * 
 * @param query
 * @returns 
 */
export const getUsersByName = async (query:string):Promise<userDocument[]> => {
    const querySanitized = sanitizeMongoQuery(query);
    const users = await userModel.find({name:"\\"+querySanitized+"\\"}).exec();

    if(!users.length){
      console.error(new Error(`No user has a username that match the query : ${query}.`));
    }
    return users;
}

/**
 * Get the user wich username match the query
 * 
 * @param query 
 * @returns 
 */
export const getUserByName = async (query:string):Promise<userDocument|null> => {
    const querySanitized = sanitizeMongoQuery(query);
    const user = await userModel.findOne({name:querySanitized}).exec();
    if(!user){
      console.error(new Error(`No user with the username : ${query} found.`));
    }
    return user;
}

/**
 * Get the user that match the uid
 * 
 * @param query 
 * @returns 
 */
export const getUserByUid = async (uid:string):Promise<userDocument|null> => {
    const uidSanitized = sanitizeMongoQuery(uid);
    const user = await userModel.findOne({uid:uidSanitized}).exec();
    if(!user){
      console.error(new Error(`No user with the uid : ${uid} found.`))
    }
    return user;
}