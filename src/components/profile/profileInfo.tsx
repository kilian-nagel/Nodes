
interface Props {
    username:string
}
 
const ProfileInfo: React.FunctionComponent<Props> = ({username}) => {
    const style = {
        fontWeight:"700"
    };
    return ( 
        <div className='profile-info' style={style}>
            <p>{username}</p>
        </div>
    );
}

export default ProfileInfo;