
import PostHeader from '@/components/postCreator/postCreatorHeader';
import TextBox from '@/components/postCreator/postCreator';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { MoonLoader } from 'react-spinners';
import { useUser } from '@auth0/nextjs-auth0/client';

function handleClickOnPostBtn(uid:string){
}

function Page({ params }: { params: { postId: string } }) {
    const {user} = useUser();
    const uid = user?.sub;

    console.log(params);
    console.log(params.postId);

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