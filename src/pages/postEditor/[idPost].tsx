
import PostHeader from '@/components/postCreator/postCreatorHeader';
import TextBox from '@/components/postCreator/postCreator';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { MoonLoader } from 'react-spinners';
import { useUser } from '@auth0/nextjs-auth0/client';
import Router, { useRouter } from 'next/router';

function handleClickOnPostBtn(uid:string){

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