import ProfileInfo from "../profile/profileInfo";
import DropdownMenu from "./DropdownMenu";
import PostInfo from "./postInfo";

interface props {
    username:string,
    date:Date
}

const PostHeader:React.FunctionComponent<props> = ({username,date})=>{
    const options = [
        {
            label:"modify post",
            url:"/modifyPost"
        },
        {
            label:"bookmark",
            url:"/bookmark"
        }
    ]
    
    return (
    <div className="profile-header flex-spaceBetween-center">
        <div className="left flex-start-center">
            <ProfileInfo username={username}/>
            <PostInfo date={date}></PostInfo>
        </div>
        <div className="right">
            <DropdownMenu options={options}></DropdownMenu>
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