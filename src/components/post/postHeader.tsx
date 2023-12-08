import { useUser } from "@auth0/nextjs-auth0/client";
import ProfileInfo from "../profile/profileInfo";
import DropdownMenu from "./DropdownMenu";
import PostInfo from "./postInfo";
import { useContext } from "react";
import { UserDataContext } from "@/pages/_document";
import userSchema from "@/interfaces/user";

interface props {
    post:postSchemaPopulated,
    username:string,
    date:Date
}

const PostHeader:React.FunctionComponent<props> = ({username,date,postId})=>{
    const {user} = useUser();
    const userData = useContext(UserDataContext);

    const ownOptions = [
        {
            label:"delete post",
            url:"/delete"
        },
        {   
            label:"modify post",
            url:"modify post"
        }
    ]

    let generalOptions = [
        {
            label:"bookmark",
            url:"/bookmark"
        }
    ]

    if(userOwnPost(userData,postId)){
        // Si l'utilisateur a écrit le poste affiché, alors il doit diposer des options/droits de modification et de suppression
        generalOptions = [...generalOptions,...ownOptions];
    }

    return (
    <div className="profile-header flex-spaceBetween-center">
        <div className="left flex-start-center">
            <ProfileInfo username={username}/>
            <PostInfo date={date}></PostInfo>
        </div>
        <div className="right">
            <DropdownMenu options={generalOptions}></DropdownMenu>
        </div>
    </div>
    );
}

function userOwnPost(user:userSchema,postId:string){
    for(const post of user.posts){
        if(post._id.toString() === postId) return true;
    }
    return false;
}

export default PostHeader;