import { modifyPostError } from "@/errors/postErrors";
import postModel from "../../posts";
import mongoose from "mongoose";
import { postSchemaPopulated } from "@/interfaces/post";

/*
    Modify the post that match the id of the post in given in argument.
    The post with this id will be updated to be equal to the argument. 
*/
export async function modifyPostFromDatabase(postUpdated:postSchemaPopulated):Promise<undefined>{
    const id = new mongoose.Types.ObjectId(postUpdated._id);
    await postModel.replaceOne({_id:id},postUpdated).catch((err:Error)=>{
        throw new modifyPostError(err.message);
    });
}