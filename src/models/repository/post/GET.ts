import { getPostError } from "@/errors/postErrors";
import postModel, { postDocument } from "../../posts";
import userModel from "../../users";

type getPost = (query:string,queryType:string) => Promise<postDocument|undefined>;
type getPosts = (query:string,queryType:string) => Promise<postDocument[]|undefined>;

export class getRequests {
    static getPosts:getPosts = async(query:string,queryType:string) => {
        let posts = [];
        if(queryType==="none"){
            posts = await postModel.find({}).limit(10).catch((err:Error)=>{
                throw new getPostError(err.message);
            });
        } else {
            posts = await postModel.where(queryType).equals(query).limit(10).catch((err:Error)=>{
                throw new getPostError(err.message);
            });
        }
        const populatedPosts = await postModel.populate(posts, { path: "source", model: userModel }).catch((err:Error)=>{
            throw new getPostError(err.message);
        });
        return populatedPosts;
    }

    static getPost:getPost = async(query:string,queryType:string) => {
        const post = await postModel.findOne({}).where(queryType).equals(query).catch((err:Error)=>{
            throw new getPostError(err.message);
        });
        const populatedPost = await postModel.populate(post, { path: "source", model: userModel }).catch((err:Error)=>{
            throw new getPostError(err.message);
        });
        return populatedPost;
    }
}