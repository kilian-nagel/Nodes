import { handleAxiosErrors } from "@/errors/axiosErrors";
import postData from "@/interfaces/post";
import axios, { AxiosError } from "axios";

interface apiResponse {
  config:Object,
  data:postData[]
}

/**
 * Fetch recent posts that contain the query passed in argument
 * 
 * @param query 
 * @returns an array that contains 10 posts.
 */
export const getPosts = async (query:string):Promise<apiResponse|undefined>=> {
  try {
    const posts = await axios.get<any, apiResponse>(`/api/posts?query=${query}`);
    return posts;
  } catch (err:unknown) {
    if (axios.isAxiosError(err)) {
      handleAxiosErrors(err);
    } else if(err instanceof Error){
      throw new Error("Unknown error - " + err.message);
    }
  }
};