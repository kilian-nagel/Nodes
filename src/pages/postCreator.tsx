
import PostHeader from '@/components/postCreator/postCreatorHeader';
import TextBox, { getPostContent } from '@/components/postCreator/postCreator';
import { NextPage } from 'next';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { MoonLoader } from 'react-spinners';
import { addPostToDatabase } from '@/data/posts';

function handleClickOnPostBtn(){
    addPostToDatabase(getPostContent());
}

const Post:NextPage = () => {
    return ( 
        <main>
            <ErrorBoundary fallback={<div>Could not load the page.</div>}>
                <Suspense fallback={<MoonLoader/>}>
                    <PostHeader handleClick={handleClickOnPostBtn}/>
                    <TextBox/>
                </Suspense>
            </ErrorBoundary>
        </main>
    );
}

export default Post;