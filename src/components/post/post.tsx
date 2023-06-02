
import PostHeader from './postHeader';
import ProfileInfo from '../profile/profileInfo';
import ProfilePicture from '../profile/profilePicture';

interface props {
    username:string,
    pictureUrl:string,
    postContent:string,
    category:string,
    time:Date
}

const Post:React.FunctionComponent<props> = ({username,pictureUrl,postContent,time}) =>{
    const postStyle = {
        display:"flex",
        gap:"0.5rem",
        width:"min(100%,520px)"
    }
    const contentStyle = {
        width:"100%"
    }
    return (
        <div className="post" style={postStyle}>
            <ProfilePicture pictureUrl={pictureUrl}/>
            <div className="content" style={contentStyle}>
                <PostHeader username={username} date={time}/>
                <div className="postContent">
                    {postContent}
                </div>
            </div>
        </div>
    )
}

export default Post;