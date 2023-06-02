import ProfileInfo from "../profile/profileInfo";
import PostInfo from "./postInfo";

interface props {
    username:string,
    date:Date
}

const PostHeader:React.FunctionComponent<props> = ({username,date})=>{
    
    return (
    <div className="profile-header flex-spaceBetween-center">
        <div className="left flex-start-center">
            <ProfileInfo username={username}/>
            <PostInfo date={date}></PostInfo>
        </div>
        <div className="right">
            <p>...</p>
        </div>
    </div>
    );
}

export default PostHeader;