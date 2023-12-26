import ProfileInfo from "../profile/profileInfo";
import DropdownMenu from "./DropdownMenu";
import PostInfo from "./postInfo";
import { createContext, useEffect, useState } from "react";
import userSchema from "@/interfaces/user";
import { getUserInfo } from "@/data/users";
import { useUser } from "@auth0/nextjs-auth0/client";
import mongoose from "mongoose";
import { postSchemaPopulated } from "@/interfaces/post";
import { userOwnPost } from "@/lib/posts";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { deletePost } from "@/data/posts";

interface props {
    post:postSchemaPopulated,
    username:string,
    date:Date
}

const UserDataContext = createContext<userSchema>({
    _id:new mongoose.Types.ObjectId(),
    uid:"",
    username:"",
    picture:"",
    friends:[],
    messages:[],
    posts:[]
  });

const PostHeader:React.FunctionComponent<props> = ({username,date,post})=>{
    const user = useUser();
    const router = useRouter();
    const [userData,setUserData] = useState<userSchema>({
      _id:new mongoose.Types.ObjectId(),
      uid:"",
      username:"",
      picture:"",
      friends:[],
      messages:[],
      posts:[]
    });

    useEffect(()=>{
        let flag = true;
        async function fetchUserData(){
          if(user === undefined || user===null || user.user===null || user.user === undefined || user.user.sub === null || user.user.sub === undefined) return;
          
          const userInfo = await getUserInfo(user.user?.sub);
          if(flag){
            if(userInfo===undefined) return;
            setUserData(userInfo);
          }   
        }
    
        fetchUserData();
    
        return () => {
          flag = false;
        }
    },[user]);
    
    let generalOptions = [
        {label:'bookmark',action:()=>modifyPostWrapper(post._id.toString(),router)}
    ];

    const ownOptions = [
        {label:'modify',action:()=>modifyPostWrapper(post._id.toString(),router)},
        {label:'delete',action:()=>deletePostWrapper(post,userData)}
    ]

    if(userOwnPost(post,userData)){
        // Si l'utilisateur a écrit le poste affiché, alors il doit diposer des options/droits de modification et de suppression
        generalOptions = [...generalOptions,...ownOptions];
    }

    return (
    <UserDataContext.Provider value={userData}>
        <div className="profile-header flex-spaceBetween-center">
            <div className="left flex-start-center">
                <ProfileInfo username={username}/>
                <PostInfo date={date}></PostInfo>
            </div>
            <div className="right">
                <DropdownMenu options={generalOptions}></DropdownMenu>
            </div>
        </div>
    </UserDataContext.Provider>
    );
}

async function deletePostWrapper(post:postSchemaPopulated,user:userSchema){
    await deletePost(post,user);
    return undefined;
}

async function modifyPostWrapper(idPost:string,routeur:AppRouterInstance){
    routeur.push("/postEditor/"+encodeURIComponent(idPost));
    return undefined;
}

export default PostHeader;