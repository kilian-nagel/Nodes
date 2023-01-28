import connectDb from './connection';
const userModel = require("../models/users");

interface userSchema {
    uid:string,
    username:string,
    picture:string,
    friends:Object[],
    messages:Object[],
    posts:Object[]
}

connectDb();

export async function getUser(username=""){
    let data:Array<Object>;
    if(username!==""){
        data = await userModel.find({username:username})
    } else {
        data = await userModel.find({});
    }
    return data;
}

export async function addUser(user:userSchema){
    let result = await (await getUser(user.username)).length;
    if(result === 0){
        const user = new userModel({
            uid:"0",
            username:"hi",
            picture:"",
            friends:[],
            messages:[],
            posts:[]
        });
        user.save();
    }else {
        throw "User already exists";    
    }
}