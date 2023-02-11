import * as React from 'react';
import { useState , useEffect } from 'react';
import {posts} from "../data/posts";
import {users} from "../data/users";
import Navbar from './navbar';
import Post from './post';
import {user} from "../interfaces/user";
import { postData } from '@/interfaces/post';

const Feed:React.FunctionComponent = ()=>{
    let [posts,setPosts] = useState<postData[]>([]);

    useEffect(()=>{
        setPosts(fetchPostsData());
    },[])

    return ( 
        <div id="feed">
            {posts.map((post,i)=><Post postContent={post.postContent} category={post.category} username={post.username} pictureUrl={post.pictureUrl}/>)}
        </div>
    );
}

function fetchPostsData(){
    let postsData:postData[] = [];
    Object.keys(posts).forEach((_p,i)=>{
        const post = posts[_p];
        const user:user = users[post.source];
        let postData = {
            postContent:post.content,
            category:post.category,
            username:user.username,
            pictureUrl:user.picture,
        };
        postsData.push(postData);
    });
    return postsData;
}

export default Feed;