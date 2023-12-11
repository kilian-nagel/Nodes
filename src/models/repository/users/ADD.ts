import { addUserError } from "@/errors/userErrors";
import userSchema from "@/interfaces/user";
import userModel, { userDocument } from "@/models/users";
import mongoose from "mongoose";

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