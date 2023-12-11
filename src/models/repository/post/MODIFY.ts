import { modifyPostError } from "@/errors/postErrors";
import postModel, { postDocument } from "../../posts";

/*
    Modify the post that match the id of the post in given in argument.
    The post with this id will be updated to be equal to the argument. 
*/
export async function modifyPostFromDatabase(postUpdated:postDocument):Promise<undefined>{
    await postModel.replaceOne({_id:postUpdated._id},postUpdated).catch((err:Error)=>{
        throw new modifyPostError(err.message);
    });
}