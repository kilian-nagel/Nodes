
import Link from 'next/link';
import * as React from 'react';
import { Component } from 'react';

const PostHeader:React.FunctionComponent = () => {
    const style = {
        display:"flex",
        maxWidth:"1250px",
        margin:"var(--spacing-sm) auto 0 auto",
    }

    const BackButtonstyle = {
        fontWeight:"700"
    }

    return ( 
        <header id="postHeader" className='flex-spaceBetween-center' style={style}>
            <Link href="../" style={BackButtonstyle} className="back-btn">back</Link>
            <Link href="./home" className='btn-default'>send</Link>
        </header>
    );
}

export default PostHeader ;