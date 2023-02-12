import * as React from 'react';
import { useState , useEffect } from 'react';
import {posts} from "../data/posts";
import {users} from "../data/users";
import Navbar from './navbar';
import Post from './post';
import {user} from "../interfaces/user";
import { postData } from '@/interfaces/post';
import Link from 'next/link';

const Feed:React.FunctionComponent = ()=>{
    let [posts,setPosts] = useState<postData[]>([]);

    useEffect(()=>{
        setPosts(fetchPostsData());
    },[])

    const style = {
        display:"flex",
        alignItems:"flex-start",
        flexDirection:"column",
        gap:"var(--spacing-sm)",
        maxWidth: "1250px",
        padding:"0 var(--spacing-md)",
        margin:"var(--spacing-lg) auto 0 auto"  
    }

    const buttonStyle = {
        background:"black",
        position:"absolute",
        bottom:"2rem",
        right:"2rem",
        height:"50px",
        width:"50px",
        borderRadius:"50%",
        fontSize:"20px",
        color:"white"
    }

    return ( 
        <div id="feed" style={style}>
            {posts.map((post,i)=><Post postContent={post.postContent} category={post.category} username={post.username} pictureUrl={post.pictureUrl}/>)}
            <Link href="./post" style={buttonStyle} className="newPost-btn">
                +
            </Link>
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