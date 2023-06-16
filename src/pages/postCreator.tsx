
import PostHeader from '@/components/postCreator/postCreatorHeader';
import TextBox, { addPostToDatabase } from '@/components/postCreator/postCreator';
import { NextPage } from 'next';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { MoonLoader } from 'react-spinners';

function handleClickOnPostBtn(){
    addPostToDatabase();
}

const Post:NextPage = ()=>{
    return ( 
        <div id="home">
            <main>
                <ErrorBoundary fallback={<div>Could not load the page.</div>}>
                    <Suspense fallback={<MoonLoader/>}>
                        <PostHeader handleClick={handleClickOnPostBtn}/>
                        <TextBox/>
                    </Suspense>
                </ErrorBoundary>
            </main>
        </div>
    );
}

export default Post;