import Link from 'next/link';
import * as React from 'react';
import { Component } from 'react';
import ProfileInfo from './profileInfo';
import ProfilePicture from './profilePicture';

interface props {
    username:string,
    pictureUrl:string,
    postContent:string,
    category:string
}

const Post:React.FunctionComponent<props> = ({username,pictureUrl,postContent,category}) =>{
    const style = {
        display:"flex",
        gap:"0.5rem"
    }
    return (
        <div className="post" style={style}>
            <ProfilePicture pictureUrl={pictureUrl}/>
            <div className="content">
                <ProfileInfo username={username}/>
                <div className="postContent">
                    {postContent}
                </div>
            </div>
        </div>
    )
}

export default Post;