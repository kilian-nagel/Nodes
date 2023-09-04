import { sanitizeMongoQuery } from "@/data/sanitize";
import userSchema from "@/interfaces/user";
import userModel, { userDocument } from "@/models/users";
import mongoose from "mongoose";

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
export const getUserByUid = async (uid:string):Promise<userDocument|undefined> => {
    const uidSanitized = sanitizeMongoQuery(uid);
    const user = await userModel.findOne({uid:uidSanitized}).exec();
    if(user===null){
      console.error(new Error(`No user with the uid : ${uid} found.`))
      return;
    }
    return user;
}

/**
 * Get mongoose ObjectId of the user that match the UID.
 * 
 * @param uid 
 */
export async function getUserByDbID(uid:string){
  let data = await getUserByUid(uid);
  if(data === null || data === undefined) return;
  let user = data;

  return user._id;
}

/**
 * Create a complete user object ready to be added to the database
 */
export function createUser(uid:string,username:string):userSchema{
  const user = {
    _id:new mongoose.Types.ObjectId(),
    uid:uid,
    username:username,
    picture:"",
    friends:[],
    messages:[],
    posts:[]
  }
  return user;
}
