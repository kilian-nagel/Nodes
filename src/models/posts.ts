import { addPostError, getPostError, modifyPostError } from "@/errors/postErrors";
import { ObjectId } from "mongodb";
import mongoose, { Document, Schema } from "mongoose";
import userModel from "./users";

interface postDocument extends Document {
    id:string,
    content:string,
    category:string,
    source:ObjectId,
    time:Date
}

const post = new Schema<postDocument>({
    _id:Schema.Types.ObjectId,
    content:String,
    category:String,
    source:{type: Schema.Types.ObjectId, ref: 'user'},
    time:Date
});

export async function addPostToDatabase(postData:postDocument){
    const newPost = new postModel(postData);
    await newPost.save().catch((err:Error)=>{
        throw new addPostError(err.message);
    });
}

export async function getRecentPostsFromDatabase():Promise<postDocument[]|undefined>{
    const posts = await postModel.find({}).limit(10).catch((err:Error)=>{
        throw new getPostError(err.message);
    });
    const populatedPosts = await postModel.populate(posts, { path: "source", model: userModel });
    return populatedPosts;
}

export async function modifyPostFromDatabase(postUpdated:postDocument){
    await postModel.replaceOne({_id:postUpdated._id},postUpdated).catch((err:Error)=>{
        throw new modifyPostError(err.message);
    });
}

export let postModel = mongoose.model<postDocument>("post",post);
