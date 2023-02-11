import Link from 'next/link';
import * as React from 'react';
import { Component } from 'react';

interface props {
    pictureUrl:string
}

const ProfilePicture : React.FunctionComponent<props> = ({pictureUrl}) =>{
    return (
        <div className="profile-picture">
            <img src={pictureUrl} alt="profile picture" />
        </div>
    )
}

export default ProfilePicture;