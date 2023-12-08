
import ProfileInfo from './profileInfo';
import ProfilePicture from './profilePicture';

interface props {
    username:string,
    pictureUrl:string
}

export const Profile:React.FunctionComponent<props> = ({username,pictureUrl}) => {
    return (
        <div className="profile flex items-center gap-2">
            <ProfilePicture pictureUrl={pictureUrl}/>
            <ProfileInfo username={username}/>
        </div>
    )
}