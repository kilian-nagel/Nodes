
import PostHeader from '@/components/postManipulation/postCreatorHeader';
import TextBox from '@/components/postManipulation/textBox';
import { ErrorBoundary } from 'react-error-boundary';
import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { getPost, modifyPost } from '@/data/posts';
import { postSchemaPopulated } from '@/interfaces/post';
import { FlashMessage } from '@/lib/flashMessages/flashMessage';
import { FlashMessageFactory } from '@/lib/flashMessages/flashMessageFactory';
import FlashMessageHandler from '@/lib/flashMessages/flashMessageHandler';
import { ActionType, DataType, generateErrorMessage } from '@/lib/error';

async function handleClickOnPostBtn(postContent:string,uid:string,postId:string){
    const data = await modifyPost(postContent,uid,postId);
    let flashMessage:FlashMessage;
    if(data===undefined){
        const errorMessage = generateErrorMessage(DataType.POST,ActionType.MODIFY);
        flashMessage = FlashMessageFactory.createFlashMessage(errorMessage,false);
        FlashMessageHandler.addFlashMessage(flashMessage);
        return;
    }
    flashMessage = FlashMessageFactory.createFlashMessage(data.message,data.success);
    FlashMessageHandler.addFlashMessage(flashMessage);
}

function getTextAreaContent():string{
    const textArea = document.querySelector("textarea");
    return textArea?.value ? textArea.value : "";
}

export default function Page({ params }: { params: { idPost: string } }) {
    const routeur = useRouter();
    const {user} = useUser();
    const uid = user?.sub;
    const router = useRouter();
    const [postData,setPostData] = useState<postSchemaPopulated>();
    
    useEffect(()=>{
        let flag = true;

        (async()=>{
            if(!(typeof router.query.idPost=="string")) return;
            const data = await getPost(decodeURIComponent(router.query.idPost));
            if(data===undefined) return;

            if(flag){
                setPostData(data);
            }
        })();

        return ()=>{
            flag = false;
        }
    },[]);


    return ( 
        <main>
            <ErrorBoundary fallback={<div>Could not load the page.</div>}>
                <PostHeader handleClick={async ()=>{
                        await handleClickOnPostBtn(getTextAreaContent(),uid ? uid : "",postData?._id ? postData._id.toString() : "");
                        routeur.push("/home");
                    }}/>
                <TextBox text={postData?.content ? postData.content : ""}/>
            </ErrorBoundary>
        </main>
    );
}