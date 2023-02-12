import Link from 'next/link';
import * as React from 'react';
import { Component } from 'react';

interface props {
    pictureUrl:string
}

const ProfilePicture : React.FunctionComponent<props> = ({pictureUrl}) =>{
    const style = {
        borderRadius:"25px",
        background:"var(--orochimaru)",
        width:"50px",
        height:"50px"
    };
    return (
        <div className="profile-picture">
            {
                pictureUrl ?  <img src={pictureUrl} style={style} alt="profile picture" /> : <div style={style}></div>
            }
        </div>
    )
}

export default ProfilePicture;