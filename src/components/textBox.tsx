import * as React from 'react';
import { Component } from 'react';

const TextBox:React.FunctionComponent = () => {
    const style = {
        paddingTop:"var(--spacing-md)",
        maxWidth:"1250px",
        margin:"0 auto"
    }

    function createNewPost(content:string){
    }

    function getPostContent(){
        let textarea = document.querySelector("textarea") as HTMLTextAreaElement;
        let content = textarea.value;
        return content;
    }

    return ( 
        <div id="textBox" style={style}>
            <textarea>

            </textarea>
        </div>
    );
}

export default TextBox;