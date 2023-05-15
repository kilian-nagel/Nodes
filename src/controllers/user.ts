import { userSchema } from '@/models/users';
import user from '../interfaces/user';
import connectDb from '../lib/dbConnection';
import userSchema from '@/interfaces/user';
const userModel = require("../models/users");

export interface userSchema {
    uid:string,
    username:string,
    picture:string,
    friends:Object[],
    messages:Object[],
    posts:Object[]
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