
import PostHeader from '@/components/postHeader';
import TextBox, { addPostToDatabase } from '@/components/textBox';

function handleClickOnPostBtn(){
    addPostToDatabase();
}

function Post() {
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