
import PostHeader from '@/components/postHeader';
import TextBox, { addPostToDatabase } from '@/components/textBox';
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