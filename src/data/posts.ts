import { handleAxiosErrors } from "@/errors/axiosErrors";
import { postSchemaPopulated } from "@/interfaces/post";
import { parsePostContent } from "@/lib/parsing";
import axios from "axios";
import { sanitizeInput } from "./sanitize";
import { getPostContent } from "@/components/postManipulation/postCreator";
import { buildPost, createNewPost, isPostContentValid, userOwnPost } from "@/lib/posts";
import userSchema from "@/interfaces/user";
import { Fetcher } from "swr";
import fetch from "isomorphic-unfetch";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE';

export function apiGET<T>(url: string,httpMethod:HttpMethod): Promise<T> {
  return fetch(url,{method:httpMethod})
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<T>
    })
}

export function apiPOST<T>(url: string,httpMethod:HttpMethod,data:any): Promise<T> {
  return fetch(url,{body:data,method:httpMethod})
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<T>
    })
}

interface responseDelete {
  success:boolean,
  data:string
}

interface RequestState {
  success:boolean,
  message:string
}

interface IResponse<T> {
  state:RequestState,
  data:T
} 

type responseGetPosts = IResponse<postSchemaPopulated[]>;
type responseGetPost = IResponse<postSchemaPopulated>;

/**
 * Fetch recent posts that contain the query passed in argument
 * 
 * @param query 
 * @returns an array that contains 10 posts.
 */
export const getPosts: Fetcher<postSchemaPopulated[],String> = async (query) => {
  try {
    const dataApi = await apiGET<responseGetPosts>("api/posts?query=&queryType=none","GET");
    return dataApi.data;
  } catch (err:unknown) {
    if (axios.isAxiosError(err)) {
      handleAxiosErrors(err);
    } else if(err instanceof Error){
      throw new Error("Unknown error - " + err.message);
    }
    return [];
  }
};

/**
 * Fetch the post that match the postId
 *  
 * @param query 
 * @returns an array that contains 10 posts.
 */
export const getPost = async (postId:string):Promise<postSchemaPopulated|undefined>=> {
  try {
    const post = await apiGET<responseGetPost>(`/api/posts?query=${postId}&queryType=_id`,"GET");
    return post.data;
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
    apiPOST("/api/posts","POST",post);
  }
}

/**
 * Add a post to the database. This method parses the content of the post and check if it is valid.
 * If the content is valid then the post is added to the database.
 * 
 * @param postContent
 */
export const modifyPost = async (postContent:string,uid:string,postId:string):Promise<RequestState|undefined>=>{
  const postCategory = "main"; // Temporary
  let postContentSanitized = sanitizeInput(postContent);
  postContentSanitized = parsePostContent(postContent);
  const post = JSON.stringify(buildPost(postContentSanitized,postCategory,uid,postId));

  if(isPostContentValid(postContent)){
    const reponse = await apiPOST<RequestState>("/api/posts","PUT",post);
    return;
  }

  return {
    message:"post content is invalid",
    success:false
  }
}

/**
 * 
 * @param postContent 
 */
export const deletePost = async (post:postSchemaPopulated,user:userSchema):Promise<undefined|responseDelete>=>{
  const id = post._id.toString();

  if(userOwnPost(post,user)){
    apiPOST("/api/posts","DELETE",id);
    return;
  } else {
    return {
      success:false,
      data:"vous ne pouvez pas effacer un post dont vout n'êtes pas le propriétaire"
    }
  }
}
