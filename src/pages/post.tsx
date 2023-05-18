
import PostHeader from '@/components/postCreator/postCreatorHeader';
import TextBox, { addPostToDatabase } from '@/components/postCreator/postCreator';
import { NextPage } from 'next';

function handleClickOnPostBtn(){
    addPostToDatabase();
}

const Post:NextPage = ()=>{
    return ( 
        <div id="home">
            <main>
                <PostHeader handleClick={handleClickOnPostBtn}/>
                <TextBox/>
            </main>
        </div>
    );
}

export default Post;