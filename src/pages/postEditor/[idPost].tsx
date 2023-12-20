
import PostHeader from '@/components/postManipulation/postCreatorHeader';
import TextBox from '@/components/postManipulation/textBox';
import { ErrorBoundary } from 'react-error-boundary';
import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { getPost, modifyPost } from '@/data/posts';
import { postSchemaPopulated } from '@/interfaces/post';

function handleClickOnPostBtn(postContent:string,uid:string){
    if(postContent!==""){
        modifyPost(postContent,uid);
    }
}
}

export default function Page({ params }: { params: { idPost: string } }) {
    const {user} = useUser();
    const uid = user?.sub;
    const router = useRouter();

    console.log(router.query);

    return ( 
        <main>
            <ErrorBoundary fallback={<div>Could not load the page.</div>}>
                <Suspense fallback={<MoonLoader/>}>
                    <PostHeader handleClick={()=>handleClickOnPostBtn(uid ? uid : "")}/>
                    <TextBox/>
                </Suspense>
            </ErrorBoundary>
        </main>
    );
}