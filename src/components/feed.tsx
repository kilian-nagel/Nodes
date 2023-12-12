import {postSchemaPopulated} from '@/interfaces/post';
import Link from 'next/link';
import * as React from 'react';
import Post from './post/post';
import { getPosts } from '@/data/posts';
import { CSSProperties, useEffect, useState } from 'react';
import { BulletList } from 'react-content-loader';

const Feed:React.FunctionComponent = ()=> {
    const [posts,setPosts] = useState<postSchemaPopulated[]>([]);
    const [loading,setLoading] = useState<boolean>(true);

    useEffect(()=>{ 
        let flag = true;
        async function fetchPosts():Promise<undefined>{
            const response = await getPosts("");
            if(response && response.data){
                if(flag){
                    setPosts(response.data);
                    setLoading(false);
                }
            } else {
                throw new Error("failed to get recent posts.");
            }
        };
    
        fetchPosts();

        return () => {
            flag = false;
        }
    },[]);

    if(loading){
        return <div style={{flex:"1 1 0",padding:"2rem 0 0 0"}}>
            <BulletList />
        </div>
    }

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
                posts.map((post)=>{
                    if(post){
                        return <Post postContent={post.content} category={post.category} post={post}
                        time={post.time} username={post.source.username} key={crypto.randomUUID()} pictureUrl={post.source.picture}/>
                    }
                })
            }
            <div style={buttonContainerStyle} className="newPost-btn" aria-label='create a new post' title='create a new post'>
                <Link className='flex-center-center' style={buttonStyle} href="./postCreator">
                    +
                </Link>
            </div>
        </div>
    );
}

export default Feed;