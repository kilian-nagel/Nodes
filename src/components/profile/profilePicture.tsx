import Image, { ImageLoader } from "next/image";

interface props {
    pictureUrl:string
}

const imageLoader : ImageLoader = ({ src, width, quality }) => {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

const ProfilePicture : React.FunctionComponent<props> = ({pictureUrl}) =>{
    const style = {
        borderRadius:"25px",
        background:"var(--orochimaru)",
        width:"44px",
        height:"44px"
    };
    return (
        <div className="profile-picture" style={style}>
            {
                 ? <Image loader={imageLoader} src={pictureUrl} width={44} height={44} alt="profile picture" /> : <div style={style}></div>
            }
        </div>
    )
}

export default ProfilePicture;