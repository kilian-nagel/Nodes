import mongoose, { Document, Schema } from "mongoose";
import userSchema from "@/interfaces/user";
import messageSchema from "@/interfaces/messages";
import {postSchema} from "@/interfaces/post";
import { ObjectId } from "mongodb";
import { sanitizeMongoQuery } from "@/data/sanitize";
import { addUserError, getUserError, modifyUserError } from "@/errors/userErrors";
import { getUser } from "@/controllers/user";
import { postModel } from "./posts";

export interface userDocument extends Document {
    _id:ObjectId,
    uid:string,
    username:string,
    picture:string,
    friends:userSchema[],
    messages:messageSchema[],
    posts:postSchema[]
};

const userSchema = new Schema<userDocument>({
    _id:Schema.Types.ObjectId,
    uid:String,
    username:String,
    picture:String,
    friends:[{ type: Schema.Types.ObjectId, ref: 'user' }],
    messages:[{ type: Schema.Types.ObjectId, ref: 'message' }],
    posts:[{ type: Schema.Types.ObjectId, ref: 'post' }],
})

type getUserStrategy  = () => userDocument|userDocument[]|undefined|null;


interface IGetUserStrategy {
    getData(query:string,queryType:string,nbUsers?:number):userDocument|userDocument[]|undefined
}

async function getUsers(query:string,queryType:string,nbUser:number){
    const users = await postModel.find({}).limit(10).catch((err:Error)=>{
        throw new getUserError(err.message);
    });
    const populatedUsers = await postModel.populate(users, { path: "posts", model: postModel });
    return populatedUsers;
}       

async function getUser(query:string,queryType:string,nbUser?:number){
    const querySanitized = sanitizeMongoQuery(query);
    const user = await userModel.findOne({queryType:query}).exec();
    if(user===null){
      throw new getUserError(`No user with ${queryType} equal to ${querySanitized} found.`);
    }
    return user;
}

class getUserContext {
    setStrategy: (strategy: getUserStrategy) => void;
    getStrategy: () => getUserStrategy;
    constructor(strategy:getUserStrategy){
        var _stragy:getUserStrategy = strategy;
        this.setStrategy = function(strategy:getUserStrategy) { _stragy = strategy; }
        this.getStrategy = () => {return _stragy;}
    }
}


/**
 * Get the user that match the uid
 * 
 * @param query 
 * @returns 
 */
export async function getUserByUid (uid:string):Promise<userDocument|undefined> {
    const uidSanitized = sanitizeMongoQuery(uid);
    const user = await userModel.findOne({uid:uidSanitized}).exec();
    if(user===null){
      console.error(new getUserError(`No user with the uid : ${uid} found.`))
      return;
    }
    return user;
}

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


export async function addUserToDatabase(user:userDocument,uid:string){
    // Check if user already exists before adding it to db
    const userExistsInDb = await userModel.exists({uid:uid}).catch((err:Error)=>{
        throw new addUserError(err.message);
    });
    if(userExistsInDb!==null){
        throw new addUserError("User already exists");
    }
    await user.save().catch((err:Error)=>{
        throw new addUserError(err.message);
    });
}

export async function modifyUserFromDatabase(uid:string,userUpdated:userDocument){
    await userModel.replaceOne({uid:uid},userUpdated).catch((err:Error)=>{
        throw new modifyUserError(err.message);
    });
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

const userModel = mongoose.model<userDocument>('users', userSchema);   
export default userModel;