import Link from 'next/link';
import * as React from 'react';
import { Component } from 'react';
import ProfileInfo from './profileInfo';
import ProfilePicture from './ProfilePicture';

function Post(username:string,pictureUrl:string,postContent:string,category:string){
    return (
        <div className="profile">
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