import Link from 'next/link';
import * as React from 'react';
import { Component } from 'react';

function ProfilePicture(pictureUrl:string){
    return (
        <img src={pictureUrl} alt="image de profile" />
    )
}

export default ProfilePicture;