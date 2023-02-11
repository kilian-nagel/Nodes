import Link from 'next/link';
import * as React from 'react';
import { Component } from 'react';

interface Props {
    username:string
}
 
const profileInfo: React.FunctionComponent<Props> = ({username}) => {
    return ( 
        <div className='profile-info'>
            <p>{username}</p>
        </div>
    );
}

export default profileInfo;