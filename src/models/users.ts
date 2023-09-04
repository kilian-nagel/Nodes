import mongoose, { Document, Schema } from "mongoose";
import userSchema from "@/interfaces/user";
import messageSchema from "@/interfaces/messages";
import postSchema from "@/interfaces/post";
import { ObjectId } from "mongodb";

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

const userModel = mongoose.model<userDocument>('users', userSchema);   
export default userModel;