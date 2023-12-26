
import PostHeader from '@/components/postManipulation/postCreatorHeader';
import TextBox, { getPostContent } from '@/components/postManipulation/postCreator';
import { NextPage } from 'next';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { MoonLoader } from 'react-spinners';
import { addPostToDatabase } from '@/data/posts';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

function handleClickOnPostBtn(uid:string){
    addPostToDatabase(getPostContent(),uid);
}

const Post:NextPage = () => {
    const {user} = useUser();
    const routeur = useRouter();
    const uid = user?.sub;

    return ( 
        <main>
            <ErrorBoundary fallback={<div>Could not load the page.</div>}>
                <Suspense fallback={<MoonLoader/>}>
                    <PostHeader handleClick={()=>{
                        handleClickOnPostBtn(uid ? uid : "");
                        routeur.push("/home");
                    }}/>
                    <TextBox/>
                </Suspense>
            </ErrorBoundary>
        </main>
    );
}

export default Post;