import userSchema from "@/interfaces/user";
import { userModel } from "@/models/users";
import { sanitizeMongoQuery } from "./sanitize";

/**
 * Get all users of the database that match the query passed in parameter
 * 
 * @param query
 * @returns 
 */
export const getUsersByName = async (query:string):Promise<userSchema[]> => {
    const querySanitized = sanitizeMongoQuery(query);
    const users = await userModel.find({name:"\\"+querySanitized+"\\"}).exec().orFail(()=>console.error(new Error(`No user has a username that match the query : ${query}.`)));
    return users;
}

/**
 * Get the user that has a username equal to the query passed in parameter
 * 
 * @param query 
 * @returns 
 */
export const getUserByName = async (query:string):Promise<userSchema> => {
    const querySanitized = sanitizeMongoQuery(query);
    const user = await userModel.findOne({name:querySanitized}).exec().orFail(()=>console.error(new Error(`No user with the username : ${query} found.`)));
    return user;
}