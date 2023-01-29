import connectDb from './connection';
const userModel = require("../models/users");

export interface userSchema {
    uid:string,
    username:string,
    picture:string,
    friends:Object[],
    messages:Object[],
    posts:Object[]
}

connectDb();

export async function getUser(username:string){
    let data:Array<Object>;
    data = await userModel.find({username:username})
    console.log(data);
    return data;
}

export async function modifyUser(userUpdated:userSchema){
    let user = await(getUser(userUpdated.uid));
    await userModel.update({uid:userUpdated.uid},{$set:{username:userUpdated.username,picture:userUpdated.picture,friends:userUpdated.friends,messages:userUpdated.messages,posts:userUpdated.posts}});
}

export async function addUser(user:userSchema){
    let result = await (await getUser(user.username)).length;
    console.log(result);
    if(result === 0){
        const userM = new userModel({
            uid:user.uid,
            username:user.username,
            picture:user.picture,
            friends:user.friends,
            messages:user.messages,
            posts:user.posts
        });
        userM.save();
    }else {
        throw "User already exists";    
    }
}