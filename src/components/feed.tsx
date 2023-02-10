import * as React from 'react';
import { Component } from 'react';
import {posts} from "../data/posts";
import Post from './post';

const Feed:React.FunctionComponent = ()=>{
    return ( 
        <div id="feed">
        </div>
    );
}

function fetchPosts(){
    Object.keys(posts).forEach(key=>{
    });
}

export default Feed;