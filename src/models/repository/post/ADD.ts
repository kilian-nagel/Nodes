import { addPostError } from "@/errors/postErrors";
import postModel, { postDocument } from "../../posts";

export async function addPostToDatabase(postData:postDocument){
    const newPost = new postModel(postData);
    await newPost.save().catch((err:Error)=>{
        throw new addPostError(err.message);
    });
}