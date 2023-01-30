import Link from 'next/link';
import * as React from 'react';
import { Component } from 'react';
import ProfileInfo from './profileInfo';
import ProfilePicture from './ProfilePicture';

function Profile(username:string,pictureUrl:string){
    return (
        <div className="profile">
            <ProfilePicture pictureUrl={pictureUrl}/>
            <ProfileInfo username={username}/>
        </div>
    )
}