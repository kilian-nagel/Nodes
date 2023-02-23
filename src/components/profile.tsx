
import ProfileInfo from './profileInfo';
import ProfilePicture from './profilePicture';

interface props {
    username:string,
    pictureUrl:string
}

const Profile:React.FunctionComponent<props> = ({username,pictureUrl}) => {
    return (
        <div className="profile">
            <ProfilePicture pictureUrl={pictureUrl}/>
            <ProfileInfo username={username}/>
        </div>
    )
}