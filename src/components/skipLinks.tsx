
import * as React from 'react';
import { Component } from 'react';

interface props {
    path:string
}

const SkipLinks:React.FunctionComponent<props> = ({path})=>{
    return ( 
        <a id='skip-link' href={path}>skip to main content</a>
    );
}

export default SkipLinks;