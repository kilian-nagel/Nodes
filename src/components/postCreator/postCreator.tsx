import { parsePostContent } from '@/lib/parsing';

export const addPostToDatabase = ()=>{
    let postCategory = "main"; // Temporary
    let postContent = parsePostContent(getPostContent());
    let post = JSON.stringify(createNewPost(postContent,postCategory));

    if(isPostContentValid(postContent)){
        fetch("/api/posts",{
            body:post,
            method:'POST'}
            );
    }
}

function isPostContentValid(content:string){
    return content.length > 0 && content.length <= 300;
}

function getPostContent(){
    let textarea = document.querySelector("#textBox textarea") as HTMLTextAreaElement;
    let content = textarea.value;
    return content;
}

function createNewPost(content:string,category:string){
    // temporary
    return {
        uid:'1',
        content:content,
        category:category,
        source:{
            uid:"-1",
            username:"guest",
            picture:"",
            friends:[],
            messages:[],
            posts:[],
        },
        time:new Date(),
    }
}

const TextBox:React.FunctionComponent = () => {
    const style = {
        paddingTop:"var(--spacing-md)",
        maxWidth:"1250px",
        margin:"0 auto"
    }

    return ( 
        <div id="textBox" style={style}>
            <textarea></textarea>
        </div>
    );
}

export default TextBox;