import { modifyUserError } from "@/errors/userErrors";
import userModel, { userDocument } from "@/models/users";

export async function modifyUserFromDatabase(uid:string,userUpdated:userDocument){
    await userModel.replaceOne({uid:uid},userUpdated).catch((err:Error)=>{
        throw new modifyUserError(err.message);
    });
}