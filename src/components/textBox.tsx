import { addPost } from '@/controllers/posts';
import { userSchema } from '@/controllers/user';

interface post {
    content:string,
    category:string,
    source:userSchema,
    time:string
}

export const addPostToDatabase = ()=>{
    let postCategory = "main"; // Temporary
    let postContent = parsePostContent(getPostContent());
    let post = createNewPost(postContent,postCategory);

    if(isPostContentValid(postContent)){
        addPost(post);
    }
}

function isPostContentValid(content:string){
    return content.length > 0 && content.length <= 300;
}


function parsePostContent(content:string){
    content.trim();
    return content;
}

function getPostContent(){
    let textarea = document.querySelector("#textBox textarea") as HTMLTextAreaElement;
    let content = textarea.value;
    return content;
}

function createNewPost(content:string,category:string){
    return {
        content:content,
        category:category,
        source:{
            uid:"-1",
            username:"guest",
            picture:"",
            friends:[],
            messages:[],
            posts:[],
        }, // Temporary.
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
            <textarea>

            </textarea>
        </div>
    );
}

export default TextBox;