import * as React from 'react';
import { useState , useEffect } from 'react';
import Post from './post';
import user from "../interfaces/user";
import { postData } from '@/interfaces/post';
import Link from 'next/link';
import { getPosts } from '@/controllers/posts';
import { getUser } from '@/controllers/user';

interface Props {
    posts:postData[];
}

const Feed:React.FunctionComponent<Props> = ({posts})=>{

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

export async function getServerSideProps(){
    const posts = await getPosts("");
    console.log("hi");

    return {props:{posts}}
}

export default Feed;