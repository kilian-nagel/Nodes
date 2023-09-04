import messageSchema from "./messages";
import postSchema from "./post";

export default interface userSchema {
    _id:ObjectId,
    sub:string,
    username:string,
    picture:string,
    friends:userSchema[],
    messages:messageSchema[],
    posts:postSchema[]
}