import { userSchema } from './user';
import connectDb from './connection';
import { postModel } from '@/models/posts';

interface postSchema  {
    content:string,
    category:string,
    source:userSchema,
    time:Date
};

export async function addPost(postToAdd:postSchema){
    let post = new postModel({
        content:postToAdd.content,
        category:postToAdd.category,
        source:postToAdd.source,
        time:postToAdd.time
    })
    post.save();
}

export async function getPosts(content:string){
    let post = await postModel.find({content:content});
    return post;
}

export async function getPost(uid:string){
    let post = await postModel.find({uid:uid});
    return post;
}

connectDb();