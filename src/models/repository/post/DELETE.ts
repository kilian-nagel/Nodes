import { deletePostError } from "@/errors/postErrors";
import postModel from "../../posts";

export async function deleteFromDatabase(idPost:string):Promise<undefined>{
    await postModel.deleteOne({_id:idPost}).catch((err:Error)=>{
        throw new deletePostError(err.message);
    })
}