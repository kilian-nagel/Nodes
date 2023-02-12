import Link from 'next/link';
import * as React from 'react';
import { Component } from 'react';

interface Props {
    username:string
}
 
const profileInfo: React.FunctionComponent<Props> = ({username}) => {
    const style = {
        fontWeight:"700"
    };
    return ( 
        <div className='profile-info' style={style}>
            <p>{username}</p>
        </div>
    );
}

export default profileInfo;