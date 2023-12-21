import { sanitizeMongoQuery } from "./sanitize";
import axios, { AxiosError } from "axios";
import { handleAxiosErrors } from "@/errors/axiosErrors";
import sanitize from "sanitize-html";
import userSchema from "@/interfaces/user";

interface userInfoResponse {
  data:null|userSchema;
}

/**
 * Get user wich uid match the uid passed in parameter.
 * 
 * @param query 
 * @param queryType 
 * @returns 
 */
export const getUserInfo = async (uid:string):Promise<userInfoResponse|undefined>=> {
  try {
    const response  = await axios.get<any, userInfoResponse>(`/api/users?sub=${uid}`);
    if (response.data) {
      return response;
    }
  } catch (err:unknown) {
    if (axios.isAxiosError(err)) {
      handleAxiosErrors(err);
    } else if (err instanceof Error) {
      console.error("Unknown error - " + err.message);
    }
    return;
  }
};

/**
 * Ask appropriate controller to add user to db 
 * 
 * @param username 
 * @param sub 
 */
export const addUser = async (username:string,sub:string):Promise<boolean> => {
  let usernameSanitized = sanitizeMongoQuery(username);
  usernameSanitized = sanitize(usernameSanitized);
  let subSanitized = sanitizeMongoQuery(sub);
  subSanitized = sanitize(subSanitized);

  try {
    axios.post("/api/users",{username:usernameSanitized,sub:subSanitized}).catch((err:Error)=>{
      throw new AxiosError(err.message);
    });
    return true;
  } catch(err:unknown){
    if(err instanceof AxiosError){
      handleAxiosErrors(err);
    } else if(err instanceof Error){
      console.error("Unknown Error "+err.message);
    }
    return false;
  }
}
