import postData from '@/interfaces/post';
import Link from 'next/link';
import * as React from 'react';
import Post from './post/post';
import { fetchPosts } from '@/lib/posts';
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
        gap:"var(--spacing-sm)",
        maxWidth: "1250px",
        flex:"1",
        marginTop:"var(--spacing-md)"
    }

    const buttonStyle:CSSProperties = {
        background:"black",
        height:"50px",
        width:"50px",
        borderRadius:"50%",
        fontSize:"20px",
        color:"white"
    }

    const buttonContainerStyle:CSSProperties = {
        position:"fixed",
        bottom:"2rem",
        right:"2rem",
    }

    return ( 
        <div id="feed" className="flex-start-start-column" style={style as React.CSSProperties}>
            {
            posts.map((post,i)=><Post postContent={post.content} category={post.category} time={post.time} username={post.source.username} key={i} pictureUrl={post.source.picture}/>)
            }
            <div style={buttonContainerStyle} className="newPost-btn" aria-label='create a new post' title='create a new post'>
                <Link className='flex-center-center' style={buttonStyle} href="./post">
                    +
                </Link>
            </div>
        </div>
    );
}

export default Feed;