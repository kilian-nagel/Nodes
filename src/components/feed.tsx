import postData from '@/interfaces/post';
import Link from 'next/link';
import * as React from 'react';
import Post from './post';
import { fetchPosts } from '@/data/posts';
import { CSSProperties, useEffect, useState } from 'react';

interface apiResponse {
    config:Object,
    data:postData[]
}

const Feed:React.FunctionComponent = ()=> {
    const [posts,setPosts] = useState<postData[]>([]);

    useEffect(()=>{
        fetchPosts("")
        .then((postData:apiResponse)=>{
           setPosts(postData.data)
        });
    },[]);

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
        <div id="feed" style={style as React.CSSProperties}>
            {posts?.map((post,i)=><Post postContent={post.postContent} category={post.category} username={post.username} key={i} pictureUrl={post.pictureUrl}/>)}
            <Link href="./post" style={buttonStyle as React.CSSProperties} className="newPost-btn" aria-label='create a new post' title='create a new post'>
                +
            </Link>
        </div>
    );
}

export default Feed;