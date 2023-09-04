import { ObjectId } from "mongodb";
import messageSchema from "./messages";
import postSchema from "./post";

export default interface userSchema {
    _id:ObjectId,
    uid:string,
    username:string,
    picture:string,
    friends:userSchema[],
    messages:messageSchema[],
    posts:postSchema[]
}