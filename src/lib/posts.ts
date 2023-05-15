import postData from "@/interfaces/post";
import axios from "axios";

interface apiResponse {
    config:Object,
    data:postData[]
}

export const fetchPosts = async (query:string):Promise<apiResponse>=> {
    const posts = await axios.get<any,apiResponse>(`/api/posts?query=${query}`);
    return posts;
}