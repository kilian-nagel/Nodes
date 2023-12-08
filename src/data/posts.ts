import { handleAxiosErrors } from "@/errors/axiosErrors";
import { postSchemaPopulated } from "@/interfaces/post";
import { parsePostContent } from "@/lib/parsing";
import axios from "axios";
import { sanitizeInput } from "./sanitize";
import { getPostContent } from "@/components/postCreator/postCreator";
import { createNewPost, isPostContentValid, userOwnPost } from "@/lib/posts";
import userSchema from "@/interfaces/user";


interface apiResponse {
  config:Object,
  data:postSchemaPopulated[]
}

interface responseDelete {
  success:boolean,
  data:string
}

interface apiResponseDelete {
  data:responseDelete
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

/**
 * Add a post to the database. This method parses the content of the post and check if it is valid.
 * If the content is valid then the post is added to the database.
 * 
 * @param postContent
 */
export const addPostToDatabase = (postContent:string,uid:string)=>{
  const postCategory = "main"; // Temporary
  let postContentSanitized = sanitizeInput(getPostContent());
  postContentSanitized = parsePostContent(postContent);
  const post = JSON.stringify(createNewPost(postContentSanitized,postCategory,uid));

  if(isPostContentValid(postContent)){
      fetch("/api/posts",{
          body:post,
          method:'POST'}
          );
  }
}

/**
 * 
 * @param postContent 
 */
export const deletePost = async (post:postSchemaPopulated,user:userSchema):Promise<undefined|responseDelete>=>{
  const id = post._id.toString();

  const config = {
    headers: {
      'Content-Type': 'text/plain',
    },
    data:id,
  };

  if(userOwnPost(post,user)){
    const response = await axios.delete<any,apiResponseDelete>(`/api/posts`,config);
    return response.data;
  } else {
    return {
      success:false,
      data:"vous ne pouvez pas effacer un post dont vout n'êtes pas le propriétaire"
    }
  }
}
