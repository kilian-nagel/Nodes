
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

function getTextAreaContent():string{
    const textArea = document.querySelector("textarea");
    return textArea?.value ? textArea.value : "";
}

export default function Page({ params }: { params: { idPost: string } }) {
    const {user} = useUser();
    const uid = user?.sub;
    const router = useRouter();
    const [postData,setPostData] = useState<postSchemaPopulated>();

    useEffect(()=>{
        let flag = true;

        (async()=>{
            if(!(typeof router.query.idPost=="string")) return;
            const data = await getPost(router.query.idPost);
            if(data===undefined) return;

            if(flag){
                setPostData(data?.data);
            }
        })();

        return ()=>{
            flag = false;
        }
    },[]);

    return ( 
        <main>
            <ErrorBoundary fallback={<div>Could not load the page.</div>}>
                <PostHeader handleClick={()=>handleClickOnPostBtn(getTextAreaContent(),uid ? uid : "")}/>
                <TextBox text={postData?.content ? postData.content : ""}/>
            </ErrorBoundary>
        </main>
    );
}