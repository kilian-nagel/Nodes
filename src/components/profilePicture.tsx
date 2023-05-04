
import Image from "next/dist/client/image";

interface props {
    pictureUrl:string
}

const ProfilePicture : React.FunctionComponent<props> = ({pictureUrl}) =>{
    const style = {
        borderRadius:"25px",
        background:"var(--orochimaru)",
        width:"50px",
        height:"50px"
    };
    return (
        <div className="profile-picture">
            {
                pictureUrl ?  <Image src={pictureUrl} style={style} alt="profile picture" title='profile picture' /> : <div style={style}></div>
            }
        </div>
    )
}

export default ProfilePicture;