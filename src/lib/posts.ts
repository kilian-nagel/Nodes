import { postSchemaPopulated } from '@/interfaces/post';
import userSchema from '@/interfaces/user';
import mongoose from 'mongoose';

/**
 * Check if the content of a post complies with the rules.
 * 
 * @param content
 */
export function isPostContentValid(content:string):boolean {
    return content.length > 0 && content.length <= 300;
}

/**
 * Create a new post using arguments that describe the post and an identifier to check who sent the post.
 * 
 * @param content 
 * @param category 
 */
export function createNewPost(content:string,category:string,uid:string){
    return {
        _id:new mongoose.Types.ObjectId(),
        content:content,
        category:category,
        source:uid,
        time:new Date(),
    }
}

/**
 * 
 * @param post 
 * @param userData 
 * @returns boolean
 */
export function userOwnPost(post:postSchemaPopulated,userData:userSchema):boolean{
    return post.source._id.toString() === userData._id.toString();  
}
